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
      console.log(eventName, arg, lsn)
      console.log(this._events)
      lsn(arg)
    });
  }
}

class ListModel extends EventEmitter {
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
    this.emit('numberDeleted');
  }

  sqrtNumber() {
    this._savedNumber = Number(this._items.join('')) ** 0.5
    this._items = this._savedNumber.toString().split('')
    this.emit('numberModified', this._items);
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
    this.emit('numberModified', this._items);
  }

  minusNumber() {
    if (this._items[0] !== '-') {
      this._items.unshift('-')
    }
    this.emit('numberModified', this._items);
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
    console.log(this._isNumberSaved)
    switch (this._memoryPendingOperation) {
      case "+":
        this._savedNumber = (this._savedNumber * 10 + Number(this._items.join('')) * 10) / 10
        break;
      case "-":
        this._savedNumber = (this._savedNumber * 10 - Number(this._items.join('')) * 10) / 10
        break;
      case "*":
        this._savedNumber = (this._savedNumber * 10 * Number(this._items.join('')) * 10) / 100
        break;
      case "/":
        this._savedNumber = (this._savedNumber * 10 / Number(this._items.join('')) * 10) / 100
        break;
      case "^":
        this._savedNumber = this._savedNumber ** Number(this._items.join(''))
        break;
      default:
        this._savedNumber = Number(this._items.join(''))
    }
    this._items = this._savedNumber.toString().split('')
    this._memoryPendingOperation = value
    this.emit('numberComputed', this._items);
  }

}
class ListView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    console.log(elements)
    // attach model listeners

    model.on('itemAdded', () => this.rebuildList())
      .on('itemRemoved', () => this.rebuildList())
      .on('numberComputed', () => this.rebuildList())
      .on('numberDeleted', () => this.rebuildList())
      .on('numberModified', () => this.rebuildList());

    // attach listeners to HTML controls
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
    this.rebuildList();
  }

  rebuildList() {
    const list = this._elements.list;
    list.value = this._model.getItems().join('')
    if (!list.value) {
      list.value = '0'
    }
    return list.value
  }

}
class ListController {
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
    if (operand) {
      this._model.computeNumber(operand);
    }
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
    if (item) {
      this._model.addItem(item);
    }
  }

}
window.addEventListener('load', () => {
  const model = new ListModel([]),
    view = new ListView(model, {
      'list': document.getElementById('display'),
      'numberButton': document.querySelectorAll('[data-number]'),
      'operationButton': document.querySelectorAll('[data-operation]'),
      'clearButton': document.getElementById('c'),
      'decimalButton': document.getElementById('decimal'),
      'minusButton': document.getElementById('x'),
      'sqrtButton': document.getElementById('sqrt'),
    }),
    controller = new ListController(model, view);

  view.show();
});