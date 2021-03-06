const RelaisFactory = (pin) => {
  const gpio = 1;
  return {
    gpio,
    on() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    off() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    for (duration) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {}, duration);
        resolve();
      });
    }
  }
}
module.exports = RelaisFactory;