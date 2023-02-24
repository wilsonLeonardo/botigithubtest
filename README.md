# botigithubtest

API responsible for fetching and storing the best repositories of five different programming languages!
## Requirements / Prerequisites

- [Node 16.x](https://nodejs.org) or later;
- [npm](https://www.npmjs.com/);

## Run Project

```
# install all dependencies
npm i
# create env file
cp sample.env .env (change the values with your need)
```

With docker-compose

```
docker-compose -f development/docker-compose.yml up
```

Without docker-compose (you will need to run mongoDB)

```
# change 'mongo uri' config on .env to 'localhost'
# run api
npm run dev
```

## Commands

- `npm run dev` to run local api;
- `npm run build` to application build;
- `npm run lint` to see possible lint errors;
- `npm run format` to fix possible lint errors;
- `npm run test` to run all tests except e2e tests;
- `npm run test:unit` to run unit tests;
- `npm run test:integration` to run integration tests;
- `npm run test:e2e:ci` to run end to end tests on ci;
- `npm run test:file` to run test for specific file;

## URL's

- Prod - https://botigithubtest.onrender.com/v1/ (Deployed on [render](https://render.com/))

## API Resources

You can find API resources at swagger [here](https://botigithubtest.onrender.com/v1/api-docs/)

### CI Status

[![](https://github.com/wilsonLeonardo/botigithubtest/actions/workflows/ci_pipeline.yml/badge.svg?branch=main)](https://github.com/wilsonLeonardo/botigithubtest/actions/workflows/ci_pipeline.yml)
