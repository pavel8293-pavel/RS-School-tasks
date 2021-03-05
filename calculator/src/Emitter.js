export default class {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((callback) => callback(...args));
    } else {
      throw new Error('Define listener for current emit event');
    }
  }
}
