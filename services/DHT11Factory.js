const PythonShell = require('python-shell');

const DHT11Factory = (pin) => {
  return {
    read() {
      return new Promise((resolve, reject) => {
        PythonShell.run('./python/dht11.py --gpio ' + pin, (err, results) => {
          if (err) throw err;
          if (results.length > 1) {
            let air_humidity = parseFloat(results[0]);
            let air_temperature = parseFloat(results[1]);
            resolve({
              air_humidity,
              air_temperature,
            });
          } else {
            reject();
          }
        });
      });
    }
  }
}

module.exports = DHT11Factory;