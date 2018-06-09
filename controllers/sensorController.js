const DHT11Factory = process.env.NODE_ENV === 'production' ? require('./../services/DigitalSensorFactory') : require('./../tests/services/DHT11Factory');
const DigitalSensorFactory = process.env.NODE_ENV === 'production' ? require('./../services/DigitalSensorFactory') : require('./../tests/services/DigitalSensorFactory');
const dht = DHT11Factory(4);
const moistureSensor = DigitalSensorFactory(17);

const sensorController = {
  getDHT: function (req, res, next) {
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  getMoisture: function (req, res, next) {
    moistureSensor.read().then((reading) => {
      res.send(reading);
    });
  },
  readAll: function (req, res, next) {
    let response = null;
    moistureSensor.read()
      .then((res_moisture) => {
        response = res_moisture
        return res_moisture;
      }, () => {
        response = {
          "soil_raw_data": null,
          "soil_status": null,
        };
        return {};
      })
      .then(() => {
        return dht.read()
      })
      .then((res_dht) => {
        response = Object.assign(res_dht, response);
        res.send(response);
      }, () => {
        response = Object.assign({
          air_temperature: null,
          air_humidity: null,
        }, response)
      });
  },
};

module.exports = sensorController;