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

## Hardware Setup

Set up your raspberry pi and plug in your gpio stuff.

gpio port 4: DHT11  
gpio port 17: moisture sensor  
gpio port 27: relais

## Install

Lets get started by installing mongodb version 2.x on your machine / raspberry pi.

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install mongodb-server
```

Start the service on your pi with this command:  
`sudo service mongod start`

Setup pm2 via `sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi`

Edit the service with `sudo vim /etc/systemd/system/pm2-pi.service` and comment out the line `Type=forking`. You can now save pm2 processes and they should reboot automatically.

## Use

Run `npm i` to install all dependencies.

a) Run `npm run dev` to run the local development version for testing

> it will be using mock services instead of any raspberry pi connectors

b) Run `npm run prod` to run the server with the "real" services.

> this will only work when run on a raspberry pi, as it needs gpio inputs to function

Send a POST request to `localhost:4000/auth/register` with your account details in the body (json)

```json
{
  "email": "myemail@gmail.com",
  "password": "myPassword123"
}
```

> For security reasons, I'd comment out the `/register` route in `./routes/auth.js`, so users cant just register.

## Routes

> Found in `./routes/`

### User

`/user/create`

**body**

```json
{
  "email": "my@email.com",
  "password": "myPassword"
}
```

`/user/delete`

**body**

```json
{
  "_id": "123456"
}
```

`/user/profile`

**response**

```json
{
  "_id": "123456",
  "email": "my@email.com"
}
```

### Pump

### Sensor

### Event
