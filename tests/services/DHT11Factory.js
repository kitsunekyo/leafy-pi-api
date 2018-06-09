const DHT11Factory = (pin) => {
  return {
    read() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            air_humidity: 99,
            air_temperature: 99,
          });
        }, 3000)
      });
    }
  }
}

module.exports = DHT11Factory;