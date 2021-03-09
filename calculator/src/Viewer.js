import EventEmitter from './Emitter';

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
    mainDisplay.value = numbers.join('');
    return mainDisplay.value;
  }

  renderMemoryDisplay(pendings) {
    const { memoryDisplay } = this.elements;
    memoryDisplay.value = pendings.join(' ');
    return memoryDisplay.value;
  }
}
