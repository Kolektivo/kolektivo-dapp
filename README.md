# Kolektivo

A collection of institutional technologies that open up new opportunities for local communities to govern and finance their own regenerative economies.

This project is bootstrapped by [Aurelia 2.0](https://github.com/aurelia/new).

## Development

### Prerequisites
Make sure you have [node.js version >= 16.0.0 < 17](https://nodejs.org/en/)

### Install
Install dependencies with the following command:
```
npm ci
```

## Start development web server

    npm run start

## Build the app in production mode


This builds all files to dist folder from where you can host the app locally.

```
npm run build
```

## Test

Run all tests:

```
npm run test
```

Run tests in watch mode:

```
npm run test:watch
```

Run Playwright e2e tests:

```
npm run e2e
```

Run Playwrite interactively:

```
npm e2e:watch
```
## Analyze rollup bundle

```
npm run build
```

Then look in the dist folder for the stats.html file.