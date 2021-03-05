import EventEmitter from './Emitter.js';

export default class View extends EventEmitter {
  constructor(elements) {
    super();
    this.elements = elements;
    elements.numberButtons.addEventListener('click', (e) => {
      this.emit('numberButtonClicked', e.target.innerHTML);
    });
    elements.modifyButtons.addEventListener('click', (e) => {
      this.emit('modifyButtonClicked', e.target.innerHTML);
    });
    elements.computeButtons.addEventListener('click', (e) => {
      this.emit('computeButtonClicked', e.target.innerHTML);
    });
  }

  renderMainDisplay(numbers) {
    const { mainDisplay } = this.elements;
    if (!numbers) {
      mainDisplay.value = '0';
    } else {
      mainDisplay.value = numbers.join('');
    }
    return mainDisplay.value;
  }

  renderMemoryDisplay(numbers) {
    const { memoryDisplay } = this.elements;
    if (!numbers) {
      memoryDisplay.value = '0';
    } else {
      memoryDisplay.value = numbers.join(' ');
    }
    return memoryDisplay.value;
  }

  show() {
    this.renderMainDisplay();
    this.renderMemoryDisplay();
  }
}
