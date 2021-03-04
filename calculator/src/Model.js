import EventEmitter from './Emitter.js'

export default class Model extends EventEmitter {
    constructor(items) {
        super();
        this._numbers = items || [];
        this._isNumberSaved = false
        this._memoryPendingOperation = ''
        this._savedNumber = 0
        this._savedOperations = []
    }

    addItem(item) {
        if (this._isNumberSaved) {
            this._numbers = []
            this._isNumberSaved = false
        }
        if (item === '0' && !this._numbers.length) {
            return
        } else if (this._numbers.length === 2 && this._numbers.join('') === '-0') {
            return
        } else if (this._numbers.length === 1 && this._numbers.join('') === '0') {
            return
        } else {
            this._numbers.push(item)
            this.emit('numberAdded', this._numbers)
        }
    }

    resetMainDisplay() {
        this._savedNumber = 0
        this._numbers = []
        this._savedOperations = []
        this.emit('renderMainDisplay')
        this.emit('renderMemoryDisplay')
    }

    minusNumber() {
        if (this._numbers[0] !== '-') {
            this._numbers.unshift('-')
        } else {
            this._numbers.shift()
        }
        this.emit('renderMainDisplay', this._numbers);
    }

    decimalNumber() {
        if (this._isNumberSaved) {
            this._isNumberSaved = false
            this._numbers = []
            this._numbers.push('0')
            this._numbers.push('.')
        }
        if (!this._numbers.length || this._numbers.length === 1 && this._numbers[0] === '-') {
            this._numbers.push('0')
            this._numbers.push('.')
        }
        if (!this._numbers.includes('.')) {
            this._numbers.push('.')
        }
        this.emit('renderMainDisplay', this._numbers);
    }

    sqrtNumber() {
        this._memoryPendingOperation = ''
        const sqrtNumber = Number(this._numbers.join('')) ** 0.5
        if (sqrtNumber >= 0) {
            this._savedNumber = sqrtNumber
            this._numbers = sqrtNumber.toString().split('')
        } else {
            this._numbers = ['current number < 0']
        }
        this.emit('renderMainDisplay', this._numbers);
    }

    chooseComputeOperation(value) {
        const localOperationMemory = Number(this._numbers.join(''))
        this._numbers = []
        if (this._isNumberSaved && this._memoryPendingOperation !== '=') {
            this._numbers = this._savedNumber.toString().split('');
            this._memoryPendingOperation = value;
        } else {
            this._isNumberSaved = true;
            switch (this._memoryPendingOperation) {
                case "+":
                    this._savedNumber = parseFloat((this._savedNumber + localOperationMemory).toFixed(10))
                    break;
                case "-":
                    this._savedNumber = parseFloat((this._savedNumber - localOperationMemory).toFixed(10))
                    break;
                case "*":
                    this._savedNumber = parseFloat((this._savedNumber * localOperationMemory).toFixed(10))
                    break;
                case "/":
                    this._savedNumber = parseFloat((this._savedNumber / localOperationMemory).toFixed(10))
                    break;
                case "^":
                    this._savedNumber = parseFloat((this._savedNumber ** localOperationMemory).toFixed(10))
                    break;
                case "=":
                    this._savedNumber = localOperationMemory
                    break;
                default:
                    this._savedNumber = localOperationMemory
            }
            this._numbers = this._savedNumber.toString().split('')
            this.emit('renderMainDisplay', this._numbers);
            this._memoryPendingOperation = value;
            this.addNumbersToMemory(value, localOperationMemory)
        }
    }


    addNumbersToMemory(value, number) {
        if (value !== '=') {
            this._savedOperations.push(number)
            this._savedOperations.push(value)
        } else {
            this._savedOperations = []
        }
        this.emit('renderMemoryDisplay', this._savedOperations);
    }
}
