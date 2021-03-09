import EventEmitter from './Emitter';

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.emptyMainDisplay = '0';
    this.numbers = [];
    this.isNumberSaved = false;
    this.memoryPendingOperation = '';
    this.savedNumber = 0;
    this.savedOperations = [];
  }

  clear() {
    this.numbers = [];
    this.isNumberSaved = false;
  }

  refresh() {
    this.emit('number changed', this.numbers);
    this.emit('memory changed', this.savedOperations);
  }

  add(number) {
    if (this.isNumberSaved) {
      this.clear();
    }
    if (this.numbers.toString() === '0' && number === '0') {
      return;
    } if (this.numbers.toString() === '0') {
      this.numbers[0] = number;
    } else {
      this.numbers.push(number);
    }
    this.emit('number added', this.numbers);
  }

  reset() {
    this.savedNumber = 0;
    this.clear();
    this.numbers.push(this.emptyMainDisplay);
    this.savedOperations = [];
    this.refresh();
  }

  minus() {
    if (this.numbers[0] !== '-') {
      this.numbers.unshift('-');
    } else {
      this.numbers.shift();
    }
    this.refresh();
  }

  decimal() {
    if (this.isNumberSaved) {
      this.clear();
    }
    if (!this.numbers.includes('.')) {
      this.numbers.push('.');
    }
    this.refresh();
  }

  sqrt() {
    const computedNumber = Number(this.numbers.join(''));
    const sqrtNumber = Math.sqrt(computedNumber);
    this.memoryPendingOperation = '';
    if (sqrtNumber >= 0) {
      this.savedNumber = sqrtNumber;
      this.numbers = sqrtNumber.toString().split('');
    } else {
      this.numbers = ['current number < 0'];
    }
    this.refresh();
  }

  compute(value) {
    const localSavedNumber = Number(this.numbers.join(''));
    this.numbers = [];
    if (this.isNumberSaved && this.memoryPendingOperation !== '=') {
      this.numbers = this.savedNumber.toString().split('');
      this.memoryPendingOperation = value;
      this.save(value);
    } else {
      this.isNumberSaved = true;
      switch (this.memoryPendingOperation) {
        case '+':
          this.savedNumber = parseFloat((this.savedNumber + localSavedNumber).toFixed(10));
          break;
        case '-':
          this.savedNumber = parseFloat((this.savedNumber - localSavedNumber).toFixed(10));
          break;
        case '*':
          this.savedNumber = parseFloat((this.savedNumber * localSavedNumber).toFixed(10));
          break;
        case '/':
          this.savedNumber = parseFloat((this.savedNumber / localSavedNumber).toFixed(10));
          break;
        case '^':
          this.savedNumber = parseFloat((this.savedNumber ** localSavedNumber).toFixed(10));
          break;
        case '=':
          this.savedNumber = localSavedNumber;
          break;
        default:
          this.savedNumber = localSavedNumber;
      }
      this.numbers = this.savedNumber.toString().split('');
      this.refresh();
      this.memoryPendingOperation = value;
      this.save(value, localSavedNumber);
    }
  }

  save(value, number) {
    if (!number) {
      this.savedOperations.splice(this.savedOperations.length - 1, 1, value);
    } else if (value !== '=') {
      this.savedOperations.splice(this.savedOperations.length, 0, number, value);
    } else {
      this.savedOperations = [];
    }
    this.refresh();
  }
}
