const Gpio = require('onoff').Gpio;

const DigitalSensorFactory = (pin) => {
  const gpio = new Gpio(pin, 'in');
  return {
    gpio,
    read: () => {
      return new Promise((resolve, reject) => {
        try {
          const read = gpio.readSync();
          resolve(read);
        } catch (e) {
          reject(e);
        }
      });
    }
  };
}
module.exports = DigitalSensorFactory;