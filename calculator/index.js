class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, listener) {
    (this._events[eventName] || (this._events[eventName] = [])).push(listener);
    return this;
  }

  emit(eventName, arg) {
    (this._events[eventName] || []).slice().forEach(lsn => {
      lsn(arg)
    });
  }
}
class Model extends EventEmitter {
  constructor(items) {
    super();
    this._items = items || [];
    this._savedNumber = 0
    this._isNumberSaved = false
    this._memoryPendingOperation = ''
  }

  getItems() {
    return this._items.slice();
  }

  deleteNumber() {
    this._items = []
    this._savedNumber = 0
    this._memoryPendingOperation = ''
    this.emit('numberEntered')
    this.emit('numberModified');
  }

  sqrtNumber() {
    this._savedNumber = Number(this._items.join('')) ** 0.5
    this._items = this._savedNumber.toString().split('')
    this.emit('numberModified');
  }

  decimalNumber() {
    if (this._isNumberSaved) {
      this._items = []
      this._items.push('0')
      this._items.push('.')
      this._isNumberSaved = false
    }
    if (!this._items.includes('.')) {
      this._items.push('.')
    }
    this.emit('numberModified');
  }

  minusNumber() {
    if (this._items[0] !== '-') {
      this._items.unshift('-')
    } else {
      this._items.shift()
    }
    this.emit('numberModified');
  }

  addItem(item) {
    if (this._isNumberSaved) {
      this._items = []
      this._isNumberSaved = false
    }
    this._items.push(item);
    this.emit('itemAdded', item);
  }

  computeNumber(value) {
    this._isNumberSaved = true
    const previous = this._savedNumber
    const current = Number(this._items.join(''))
    switch (this._memoryPendingOperation) {
      case "+":
        this._savedNumber = parseFloat((previous + current).toFixed(10))
        break;
      case "-":
        this._savedNumber = parseFloat((previous - current).toFixed(10))
        break;
      case "*":
        this._savedNumber = parseFloat((previous * current).toFixed(10))
        break;
      case "/":
        this._savedNumber = parseFloat((previous / current).toFixed(10))
        break;
      case "^":
        this._savedNumber = parseFloat((previous ** current).toFixed(10))
        break;
      default:
        this._savedNumber = current
    }

    this._memoryPendingOperation = value
    this._items = this._savedNumber.toString().split('')
    this.emit('numberModified');
    this.emit('numberEntered')

  }
}
class View extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    model.on('itemAdded', () => this.rebuildDisplay())
      .on('numberModified', () => this.rebuildDisplay())
      .on('numberEntered', () => this.refreshAdditionalDisplay())

    elements.numberButton.forEach((pressedNumber) => {
      pressedNumber.addEventListener('click', () => this.emit('numberButtonClicked', pressedNumber.innerHTML))
    });
    elements.operationButton.forEach((operand) => {
      operand.addEventListener('click', () => this.emit('operationButtonClicked', operand.innerHTML))
    });
    elements.clearButton.addEventListener('click', () => this.emit('clearButtonClicked'))
    elements.sqrtButton.addEventListener('click', () => this.emit('sqrtButtonClicked'))
    elements.minusButton.addEventListener('click', () => this.emit('minusButtonClicked'))
    elements.decimalButton.addEventListener('click', () => this.emit('decimalButtonClicked'))
  }

  show() {
    this.rebuildDisplay();
  }

  rebuildDisplay() {
    const list = this._elements.list;
    list.value = this._model.getItems().join('')
    if (!list.value) {
      list.value = '0'
    }
    return list.value
  }

  refreshAdditionalDisplay() {
    const previousOperation = this._elements.previousOperationList
    if (this._model._memoryPendingOperation !== "=" && this._model._savedNumber) {
      previousOperation.value = `${this._model._savedNumber} ${this._model._memoryPendingOperation}`
    } else {
      previousOperation.value = ''
    }
    return previousOperation.value
  }
}
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('numberButtonClicked', (value) => this.addItem(value));
    view.on('operationButtonClicked', (value) => this.computeNumber(value));
    view.on('clearButtonClicked', () => this.deleteNumber());
    view.on('sqrtButtonClicked', () => this.sqrtNumber());
    view.on('minusButtonClicked', () => this.minusNumber());
    view.on('decimalButtonClicked', () => this.decimalNumber());
  }

  computeNumber(operand) {
    this._model.computeNumber(operand);
  }

  deleteNumber() {
    this._model.deleteNumber();
  }

  minusNumber() {
    this._model.minusNumber();
  }

  decimalNumber() {
    this._model.decimalNumber()
  }

  sqrtNumber() {
    this._model.sqrtNumber();
  }

  addItem(item) {
    this._model.addItem(item);
  }
}

window.addEventListener('load', () => {
  const model = new Model([]),
    view = new View(model, {
      'previousOperationList': document.getElementById('previous-number'),
      'list': document.getElementById('current-number'),
      'numberButton': document.querySelectorAll('[data-number]'),
      'operationButton': document.querySelectorAll('[data-operation]'),
      'clearButton': document.getElementById('c'),
      'decimalButton': document.getElementById('decimal'),
      'minusButton': document.getElementById('x'),
      'sqrtButton': document.getElementById('sqrt'),
    }),
    controller = new Controller(model, view);
  view.show();
});