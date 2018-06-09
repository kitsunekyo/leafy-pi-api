const Gpio = require('onoff').Gpio;

const RelaisFactory = (pin) => {
  const gpio = new Gpio(pin, 'out');
  this.gpio.writeSync(1);
  return {
    gpio,
    on() {
      return new Promise((resolve, reject) => {
        this.gpio.writeSync(0);
        resolve();
      });
    },
    off() {
      return new Promise((resolve, reject) => {
        this.gpio.writeSync(1);
        resolve();
      });
    },
    for (duration) {
      return new Promise((resolve, reject) => {
        this.off(); // shut off first
        this.on();
        setTimeout(() => {
          this.off();
        }, duration);
        resolve();
      });
    }
  }
}
module.exports = RelaisFactory;