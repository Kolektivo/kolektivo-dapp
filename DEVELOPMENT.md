# Important Dapp Commands

To run the dapp locally, clone the project and do an `npm install`. After that, do an `npm start`.

To run lint run `npm run lint`

To run tests run `npm test`

To do a complete wipe of node_modules/package lock and re-install run `npm run clean`

# Web Service

The web service was created to be able to capture contract data over time for charting reasons. The code for the web service can be found in kolektivo-dapp repo at /src/firebase.ts. This web service uses many of the same service and store classes that the dapp uses, for the sole purpose of not duplicating code.

To build the web service, there are two commands in package.json.

- `build:chart-data-script` (prod)
- `build:dev:chart-data-script` (dev)

When this command is run, it will build and bundle everything needed into /scripts/update-chart-data/index.mjs. This web service uses specific contract json data (just like the dapp) so when the contracts change, this web service will need to be updated and pushed to the dev/master branch so it can use the most updated contracts.

TODO: We will need to get a version of the web service uploaded for dev and prod and have two different cron tab expressions calling each of them so we can store dev and prod data in firebase. The dev web service will look at the celo-test.json contracts and the prod web service will look at the celo.json contracts.

TODO: This currently needs to be run manually. We will need to make this script run every time the contracts or the dapp code changes so it stays consistent with the common code and contracts that it interacts with. There is currently a problem with how the script is built and needs to be manually adjusted to work properly.

## Execution

The web service is invoked by a github action on the repo. The web service code itself handles being triggered more times than is needed for the intervals defined, but still only stores data when needed based on the intervals defined. So even if it only needs to store data every 5 minutes, it can be called every minute and won't store data until the 5 minute interval is hit.

This is how the flow works:

- Cloudflare CRON job runs every minute. This doesn't have to be Cloudflare, just some service that can call a GitHub action every minute.
- The CRON job calls the GitHub action using a git personal access token (PAT) having "Workflow Action" rights.
- Following is the CRON job code in cloudflare.  Replace "PAT" with the actual PAT.

    ```
    export default {
        async scheduled(event, env, ctx) {
            ctx.waitUntil(seed());
        },
    };
    function seed(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Authorization', 'Bearer PAT');
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('User-Agent', 'Cloudflare-Workers');
        return fetch('https://api.github.com/repos/Kolektivo/kolektivo-dapp/actions/workflows/37267987/dispatches', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({ ref: 'development' }),
        });
    }
    ```
- The GitHub action runs the webservice code at /script/update-chart-data/index.mjs.  The webservice code:
  - checks to make sure data is needed at a new interval
  - calls the contracts and gathers the data it needs
  - stores the data in firebase

- Github logs each invocation of the action.  The action will show success or failure depending on whether the webservice succeeds.

# Firebase

We are currently only using firebase to store our contract data over time. This data is pushed to firebase from our web service.

The firebase project we are using can be found at https://console.firebase.google.com/u/1/project/kolektivo-36b63/overview

On the left menu, select Build -> Firestore Database to view the data currently stored.

In the root, there are two collections. One is called "chartData" and the other is called "testData".

The chartData collection is where the production data will be located while the testData collection is where the data for DEV/QA testing is located.

Under each collection is a list of documents. 7 of them coincide with specific chart data and one of them logs when the last data sync happened. The "LastSync" document has a "day", "hour" and "minute" collection and each of those have a document with a UTC timestamp as the name and they tell the app when the last time the data was synced.

Under each of the chart documents is a collection of "day", "hour" and "minute". These are different intervals of time that the chart can use.

- Day data is captured every day at 12 midnight GMT. This data will never cycle out and should always be there historically
- Hour data is captured at the 00 minute of every hour. This data is only needed for a 24 hour period so every hour it captures a new data point, the 24th hour before it gets deleted by the web service
- Minute data is captured every 5 minutes. This data is only needed for a 1 hour period so every 5 minutes it captures a new data point, the 12th oldest data point is deleted by the web service
- All date/time data is stored in GMT

# Firebase Authentication

On firebase we currently have one token having no restrictions, thus giving read/write access to everyone.

You can edit the rules for that token here: https://console.firebase.google.com/u/1/project/kolektivo-613ca/firestore/rules.

TODO:

Before going live, in order to appropriately restrict access to the firebase data, we will want to create two more restrictive access tokens on firebase:

- The first token will allow read rights on the data. This token will be used in the dapp to read the data and display it. This will be a publically available token, but should be limited by CORS to only be used from our dapp.
- The second token will allow read and write access and will be private to our web service so no one else has access to it. This will be used by GitHub actions and will not be publically available.

However, tt is as yet uncertain how to create two different tokens for the same firestore database, or if it's even possible. This needs to be researched.


# Token List

There is a JSON file located at https://github.com/Kolektivo/tokenlists/blob/main/tokenlist.json which the dapp uses as meta data for the tokens that are in the Reserve and Treasury. This list gets updated by the back end team whenever a token gets deposited or withdrawn from reserve/treasury.

Because the dapp relies heavily on this meta data, when the app loads on the user's machine, it does a fetch from https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json to get the latest data and uses it directly from the repo.

TODO: There are plans in the future to hand this differently so the app doesn't have to get this data via fetch. It will be a GitHub Action trigger to release the code with the new token list data rather than fetching it.

# Contract Models

The dapp gets all it's source data from contracts.

There are three main contracts that the dapp will be reliant on:

- Monetary (https://github.com/Kolektivo/kolektivo-monetary-contracts)
- Badger (https://github.com/Kolektivo/kolektivo-governance-contracts)
- GeoNFT (https://github.com/Kolektivo/geonft-registry-monorepo)

Each of these contracts, when deployed, produce JSON files under their respective repos' /export folder. These JSON files define all the names, chain ids and ABI data that is needed for the dapp to call the contract functions.

A node script located at /build/postinstall/buildModels.mjs builds "Model" files from the needed ABI JSON files and puts them in the /src/models/generated folder. Typescript contract objects are generated by ethers.js, also from the ABI JSON files. These Model files are used to supply typings to assist in using the ethers.js ethers.js contract objects.

The buildModels script is run when `npm install` is run on the server.

Every time the contracts are deployed, there could be changes to the models so they should then be re-generated.

# Post Install/External Repo Changes

Post install is referred to scripts that run after an "npm install" is run, whether it be on the developer's local machine or the web server.

There are a few things that need to happen on post install to make sure the app is running.

- The newest contract JSON files need to be fetched from their repos
- Based on the newest contract JSON files, models will need to be rebuilt
- Token list meta data needs to be pulled into the app (the app is currently using fetch, and not this, but will use this eventually)

Doing this on post install allows the web server to always have the latest files needed based on external repo changes.

In the future, we will need a watcher of some kind that watches the external repos that affect the dapp and when those repos get pushed to, the watcher will trigger an action on GitHub to rebuild the dapp and run this post install to get the latest data it needs.

The post install currently runs one file called /build/postinstall/index.mjs which then handles all the other scripts it needs to run.

# What is remaining for MVP

For the Monetary pages (Treasury/Reserve not Governance) these are the things that still need to be developed:

- Get data from Symmetric Pool
- Get data from Mento
- Get data from Proxy Pool

For the governance pages these are the things that still need to be developed:

- Build out dynamic form for submitting a proposal
- Get the categories for each proposal type and build navigation for those
- Get the public and private categorizations for the contract functions
- Get the proposals from the Governance contract (Ready to Execute, Pending and History)
- Wire up all the badge verification through litjs and test

# Project Coding Guidelines

## App data flow

We have defined a certain flow in the app in terms of how the UI gets data delivered to it. The view communicate with stores and the stores communicate with services.

- Views are the UI of the app. Stores are injected into the views and the views can call data from the stores. Views are supposed to be in charge of any formatting of data on the UI. (currency, numbers, strings, etc.)
- Stores are the middle layer between the view (UI) and the services (Backend). Services are injected into stores and stores call the services needed to retrieve the data. Stores are also where the business logic (any data alteration needed) and data caching reside.
- Services are the back end of the app that actually call the contracts and databases. This is the layer that returns the raw data from external services (contracts/firebase/etc.)

## Styles

In this project, we use a custom built design system that can be located at /src/design-system. This system is meant for reusable components or controls that don't only fit into this project, but could be used in any other project as well. It uses the shadow dom to make sure all components are encapsulated into their own styles so no styles bleed outside of the component. To learn more about how shadow dom works please visit https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.

Typically, no styles should ever change within a design system component. The unique style for that component should come from the parent that is using that component through parts.

## Storybook

We have created a small page at /src/pages/storybook (url: /storybook) that is only available on local environments. This page is manually updated every time there's a new design system component created to show examples of how to use that component. So if something changes on the design system, please make sure to update it in storybook with examples so others can see how to use it.

## Routing

This app uses direct routing which basically just derives the available routes from the exports of all the /pages throughout the app. Whatever is put into the /pages folder and exported will be an available route throughout the app automatically.

You can learn more about direct routing (routing without configration) here: https://docs.aurelia.io/developer-guides/cheat-sheet#new-in-v2-routing-without-configuration-direct-routing

## Dependency Injection

We use the default dependency injection in Aurelia 2. More information about how this is set up can be found at https://docs.aurelia.io/getting-to-know-aurelia/dependency-injection-di.

## @customElement

This is used to explictly define custom elements by allowing us passing parameters to the constructor.

There doesn't seem to be any documentation in the Aurelia 2 docs specifically for all the possible properties of @customElement, but it seems fairly well documented in the TypeScript file. That can be found here https://github.com/aurelia/aurelia/blob/4163dd438106f57d24573519c5f51fc22ba9f5cd/packages/runtime-html/src/resources/custom-element.ts

## Automated test

We used playwrite to and vite to build automated tests that run and make sure everything is working as expected every build. All of the automated tests can be found right next to the html file they are testing using a `.spec.ts` extension.

Builds will not complete unless all tests pass

To run tests on local use the `npm test` command
