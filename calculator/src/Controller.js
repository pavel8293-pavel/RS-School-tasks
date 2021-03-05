export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('numberButtonClicked', (value) => this.addItem(value));
    view.on('modifyButtonClicked', (value) => this.chooseModificator(value));
    view.on('computeButtonClicked', (value) => this.chooseComputeOperation(value));
    model.on('numberAdded', (value) => view.renderMainDisplay(value));
    model.on('renderMainDisplay', (value) => view.renderMainDisplay(value));
    model.on('renderMemoryDisplay', (value) => view.renderMemoryDisplay(value));
  }

  addItem(item) {
    this.model.addItem(item);
  }

  chooseModificator(value) {
    switch (value) {
      case 'C':
        this.model.resetMainDisplay();
        break;
      case '-X':
        this.model.minusNumber();
        break;
      case '.':
        this.model.decimalNumber();
        break;
      case '√':
        this.model.sqrtNumber();
        break;
      default:
        this.view.renderMainDisplay();
    }
  }

  chooseComputeOperation(value) {
    this.model.chooseComputeOperation(value);
  }

  run() {
    this.view.show();
  }
}
