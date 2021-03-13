import EventEmitter from './emitter.js'
//import DOMelement from './DOMcreater.js'
export default class View extends EventEmitter {
    constructor(elements) {
        super();
        this.elements = elements
        this.input = this.elements.inputField

        elements.addButton.addEventListener('click', () => this.emit('data entered', this.input.value));
    }

    render(data = '') {
        this.input.value = ''
        console.log(data)
        return this.input.value
    }


}