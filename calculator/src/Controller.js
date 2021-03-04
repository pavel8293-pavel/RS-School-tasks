export default class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;


        view.on('numberButtonClicked', (value) => this.addItem(value));
        view.on('modifyButtonClicked', (value) => this.chooseModificator(value));
        view.on('computeButtonClicked', (value) => this.chooseComputeOperation(value));
        model.on('numberAdded', (value) => view.renderMainDisplay(value))
        model.on('renderMainDisplay', (value) => view.renderMainDisplay(value))
        model.on('renderMemoryDisplay', (value) => view.renderMemoryDisplay(value))

    }


    addItem(item) {
        this._model.addItem(item);
    }


    chooseModificator(value) {
        switch (value) {
            case 'C':
                this._model.resetMainDisplay()
                break;
            case '-X':
                this._model.minusNumber()
                break;
            case '.':
                this._model.decimalNumber()
                break;
            case '√':
                this._model.sqrtNumber()
                break;
        }
    }

    chooseComputeOperation(value) {
        this._model.chooseComputeOperation(value)
    }
}