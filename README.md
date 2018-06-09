# LeafyPi - API Service

api for garden bot solution

## Features

- jwt authentication (bearer token)
- read digital sensors (soil moisture sensor)
- write to gpio pins (activate water pump)
- event log

## Requirements

- mongodb
- build-tools
- raspberry pi

## Use

configuration settings in `./config.js`

run `npm i` to install all dependencies

run `npm run dev` to run the local development version for testing

> it will be using mock services instead of any raspberry pi connectors

run `npm run prod` to run the server with the "real" services.

> this will only work when run on a raspberry pi, as it needs gpio inputs to function
