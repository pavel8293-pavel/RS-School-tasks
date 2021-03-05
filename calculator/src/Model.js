import EventEmitter from './Emitter.js';

export default class Model extends EventEmitter {
  constructor(items) {
    super();
    this.numbers = items || [];
    this.isNumberSaved = false;
    this.memoryPendingOperation = '';
    this.savedNumber = 0;
    this.savedOperations = [];
  }

  addItem(item) {
    if (this.isNumberSaved) {
      this.numbers = [];
      this.isNumberSaved = false;
    }
    if (this.numbers.length === 2 && this.numbers.join('') === '-0') {
      return false;
    } if (this.numbers.length === 1 && this.numbers.join('') === '0') {
      return false;
    }
    this.numbers.splice(this.numbers.length, 0, item);
    return this.emit('numberAdded', this.numbers);
  }

  resetMainDisplay() {
    this.savedNumber = 0;
    this.numbers = [];
    this.savedOperations = [];
    this.emit('renderMainDisplay');
    this.emit('renderMemoryDisplay');
  }

  minusNumber() {
    if (this.numbers[0] !== '-') {
      this.numbers.unshift('-');
    } else {
      this.numbers.shift();
    }
    this.emit('renderMainDisplay', this.numbers);
  }

  decimalNumber() {
    if (this.isNumberSaved) {
      this.isNumberSaved = false;
      this.numbers = [];
      this.numbers.splice(this.numbers.length, 0, '0', '.');
    }
    if (!this.numbers.length) {
      this.numbers.splice(this.numbers.length, 0, '0', '.');
    }
    if (this.numbers.length === 1 && this.numbers[0] === '-') {
      this.numbers.splice(this.numbers.length, 0, '0', '.');
    }
    if (!this.numbers.includes('.')) {
      this.numbers.splice(this.numbers.length, 0, '.');
    }
    this.emit('renderMainDisplay', this.numbers);
  }

  sqrtNumber() {
    this.memoryPendingOperation = '';
    const sqrtNumber = Number(this.numbers.join('')) ** 0.5;
    if (sqrtNumber >= 0) {
      this.savedNumber = sqrtNumber;
      this.numbers = sqrtNumber.toString().split('');
    } else {
      this.numbers = ['current number < 0'];
    }
    this.emit('renderMainDisplay', this.numbers);
  }

  chooseComputeOperation(value) {
    const localOperationMemory = Number(this.numbers.join(''));
    this.numbers = [];
    if (this.isNumberSaved && this.memoryPendingOperation !== '=') {
      this.numbers = this.savedNumber.toString().split('');
      this.memoryPendingOperation = value;
      this.addNumbersToMemory(value);
    } else {
      this.isNumberSaved = true;
      switch (this.memoryPendingOperation) {
        case '+':
          this.savedNumber = parseFloat((this.savedNumber + localOperationMemory).toFixed(10));
          break;
        case '-':
          this.savedNumber = parseFloat((this.savedNumber - localOperationMemory).toFixed(10));
          break;
        case '*':
          this.savedNumber = parseFloat((this.savedNumber * localOperationMemory).toFixed(10));
          break;
        case '/':
          this.savedNumber = parseFloat((this.savedNumber / localOperationMemory).toFixed(10));
          break;
        case '^':
          this.savedNumber = parseFloat((this.savedNumber ** localOperationMemory).toFixed(10));
          break;
        case '=':
          this.savedNumber = localOperationMemory;
          break;
        default:
          this.savedNumber = localOperationMemory;
      }
      this.numbers = this.savedNumber.toString().split('');
      this.emit('renderMainDisplay', this.numbers);
      this.memoryPendingOperation = value;
      this.addNumbersToMemory(value, localOperationMemory);
    }
  }

  addNumbersToMemory(value, number) {
    if (!number) {
      this.savedOperations.splice(this.savedOperations.length - 1, 1, value);
    } else if (value !== '=') {
      this.savedOperations.splice(this.savedOperations.length, 0, number, value);
    } else {
      this.savedOperations = [];
    }
    this.emit('renderMemoryDisplay', this.savedOperations);
  }
}
