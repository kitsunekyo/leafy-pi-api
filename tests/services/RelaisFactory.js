const RelaisFactory = (pin) => {
  return {
    gpio: null,
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