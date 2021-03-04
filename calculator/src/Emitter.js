export  default class  {
    constructor() {
      this._events = {};
    }
  
    on(eventName, listener) {
      if (!this._events[eventName]) {
        this._events[eventName] = []
      }
      this._events[eventName].push(listener);
    }
  
    emit(eventName, ...args) {
      const event = this._events[eventName]
      if (event) {
        event.forEach(callback => callback(...args))
      } else {
        throw new Error('Define listener for current emit event')
      }
    }
  }
