const DigitalSensorFactory = (pin) => {
  return {
    gpio: null,
    read: () => {
      return new Promise((resolve, reject) => {
        resolve(0);
      });
    }
  };
}
module.exports = DigitalSensorFactory;