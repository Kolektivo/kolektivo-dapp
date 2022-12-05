# Important Dapp Commands

To run the dapp locally, clone the project and do an `npm install`. After that, do an `npm start`.

To run lint run `npm run lint`

To run tests run `npm test`

To do a complete wipe of node_modules/package lock and re-install run `npm run clean`

# Web Service

The web service was created to be able to capture contract data over time for charting reasons. The code for the web service can be found in kolektivo-dapp repo at /src/firebase.ts. This web service uses many of the same services and stores that the dapp uses for the sole purpose of not duplicating code.

To build the web service, there are two commands in package.json.

- `build:chart-data-script` (prod)
- `build:dev:chart-data-script` (dev)

When this command is run, it will build and bundle everything needed into /script/update-chart-data/index.mjs. This web service uses specific contract json data (just like the dapp) so when the contracts change, this web service will need to be updated and pushed to the dev/master branch so it can use the most updated contracts.

TODO: We will need to get a version of the web service uploaded for dev and prod and have two different cron tab expressions calling each of them so we can store dev and prod data in firebase. The dev web service will look at the celo-test.json contracts and the prod web service will look at the celo.json contracts.

## Execution

The web service is a github action on the repo. The code allows the web service to be triggered more times than is needed, but still only stores data when needed based on the intervals defined.

This is how the flow works:

- Cloudflare CRON job runs every minute
- Calls the GitHub action using a personal access token for auth
- GitHub action runs the code at /script/update-chart-data/index.mjs
- Checks to make sure data is needed at a new interval
- Calls the contracts and gathers the data it needs
- Stores the data in firebase

# Firebase

We are currently only using firebase to store our contract data over time. This data is pushed to firebase from our web service.

The firebase project we are using can be found at https://console.firebase.google.com/u/1/project/kolektivo-36b63/overview

Click on "Firestore Database" on the left to view the data currently stored.

In the root, there are two collections. One is called "chartData" and the other is called "testData".

The chartData collection is where the production data will be located while the testData collection is where the data for DEV/QA testing is located.

Under each collection is a list of documents. 7 of them coincide with specific chart data and on of them logs when the last data sync happened.

Under each of the chart documents is a collection of "day", "hour" and "minute". These are different intervals of time that the chart can use.

- Day data is captured every day at 12 midnight GMT. This data will never cycle out and should always be there historically
- Hour data is captured at the 00 minute of every hour. This data is only needed for a 24 hour period so every hour it captures a new data point, the 24th hour before it gets deleted by the web service
- Minute data is captured every 5 minutes. This data is only needed for a 1 hour period so every 5 minutes it captures a new data point, the 12th oldest data point is deleted by the web service
- All date/time data is stored in GMT

Before going live, we will need to make two different access tokens on firebase.

- The first token will allow read rights on the data and that token will be used in the dapp to read the data and display it. This will be a publically available token, but should be limited by CORS to only be used from our dapp.
- The second token will allow read and write access and will be private to our web service so no one else has access to it. This will be used by GitHub actions and will not be publically available.

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

Each of these contracts, when deployed, produce JSON files under the /export folder. These JSON files define all the names, chain ids and ABI data that is needed for the dapp to call the contract functions.

Because the dapp uses TypeScript, it has to data information from these ABIs and generate strongly typed models from them so be able to be used in the code. There is a node script located at /build/postinstall/buildModels.mjs that looks at all the JSON files and builds the models needed and puts them in the /src/models/generated folder.

Every time the contracts are deployed, there could be changes to the models so they should be re-generated.

# Post Install/External Repo Changes

Post install is referred to scripts that run after an "npm install" is run, whether it be on the developer's local machine or the web server.

There are a few things that need to happen on post install to make sure the app is running.

- The newest contract JSON files need to be fetched from their repos
- Based on the newest contract JSON files, models will need to be rebuilt
- Token list meta data needs to be pulled into the app (the app is currently using fetch, and not this, but will use this eventually)

Doing this on post install allows the web server to always have the latest files needed based on external repo changes.

In the future, we will need a watcher of some kind that watches the external repos that affect the dapp and when those repos get pushed to, the watcher will trigger an action on GitHub to rebuild the dapp and run this post install to get the latest data it needs.

The post install currently runs one file called /build/postinstall/index.mjs which then handles all the other scripts it needs to run.
