export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('numberButtonClicked', (number) => this.add(number));
    view.on('modifyButtonClicked', (key) => this.chooseModificator(key));
    view.on('computeButtonClicked', (key) => this.compute(key));
    model.on('number added', (number) => view.renderMainDisplay(number));
    model.on('number changed', (numbers) => view.renderMainDisplay(numbers));
    model.on('memory changed', (value) => view.renderMemoryDisplay(value));
  }

  add(number) {
    this.model.add(number);
  }

  chooseModificator(buttonValue) {
    switch (buttonValue) {
      case 'C':
        this.model.reset();
        break;
      case '-X':
        this.model.minus();
        break;
      case '.':
        this.model.decimal();
        break;
      case '√':
        this.model.sqrt();
        break;
      default:
        throw new Error('Unexpected button value');
    }
  }

  compute(buttonValue) {
    this.model.compute(buttonValue);
  }

  run() {
    this.model.reset();
  }
}
