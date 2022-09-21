# Kolektivo dApp

## Overview

This repository contains the frontend of the Kolektivo distributed application (dApp), which is currently under development. 

The Kolektivo dApp is being developed for the Kolektivo Framework, which is a collection of institutional technologies that open up new opportunities for local communities to govern and finance their own regenerative economies.

- You can find a more extended brief [here](https://github.com/Kolektivo?view_as=public).
- And the **Kolektivo Framework Bluepaper** [here](https://assets.website-files.com/5fcaa3a6fcb269f7778d1f87/6319a99a8861af08a497e3a9_Kolektivo%20Bluepaper.pdf).
- And the **Kolektivo Framework Whitepaper** [here](https://github.com/Curve-Labs/Kolektivo/blob/main/The%20Kolektivo%20Framework%20Whitepaper%20v.3.pdf).

The dApp is bootstrapped by the [Aurelia 2.0](https://github.com/aurelia/new) framework.  It is written mostly in Typescript, HTML and SCSS, and is bundled using Vite.  It will initially be deployed on the [Celo Layer-1 Blockchain](https://celo.org/).

## Development

### Prerequisites

Make sure you have [node.js version >= 16.0.0 < 17](https://nodejs.org/en/)

### Install

Install dependencies with the following command:

`npm ci`

## **Start development web server**

`npm run start`

## ****Build the app in production mode****

This builds all files to dist folder from where you can host the app locally. 

`npm run build`

## Automated Tests

Run all tests:

`npm run test`

Run tests in watch mode:

`npm run test:watch`

Run Playwright e2e tests:

`npm run e2e`

Run Playwrite interactively:

`npm e2e:watch`

## Analyze rollup bundle

`npm run build`

Then look in the dist folder for the stats.html file.

## Dependencies

For an full and always updated list of dependencies please consult [package.json](https://github.com/Kolektivo/kolektivo-dapp/blob/development/package.json)

Type-safe SDK for Ethereum smart contracts:

- `@dethcrypto/eth-sdk: ^0.3.3`
- `@dethcrypto/eth-sdk-client: ^0.1.6`

Wallet providers:

- `@walletconnect/web3-provider: ^1.8.0`
- `web3modal: ^1.9.9`
- `@metamask/detect-provider: ^1.2.0`

Interactions with Ethereum and wallet provider:

- `ethers: ^5.7.0`
- `@celo-tools/celo-ethers-wrapper: ^0.3.0`

Typescript binding for Ethereum contracts:

- `@typechain/ethers-v5: ^10.1.0`


---


# **Seed Offering**

The Kolektivo Network, a coalition of innovators, impact funders, and environmental stewards, announces its seed token offering. 

For the past four years, we've researched and developed tools that enable local regenerative economies. Now, we're planting the seed for a global Kolektivo Network.

If you are interested in joining the Seed register your interest [here](https://kolektivo.typeform.com/kolektivoseed).