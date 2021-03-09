import View from './Viewer';
import Controller from './Controller';
import Model from './Model';

window.addEventListener('load', () => {
  const model = new Model();
  const view = new View({
    numberButtons: document.querySelector('.number-buttons'),
    modifyButtons: document.querySelector('.modify-buttons'),
    computeButtons: document.querySelector('.compute-buttons'),
    mainDisplay: document.getElementById('main-display'),
    memoryDisplay: document.getElementById('memory-display'),
  });
  const controller = new Controller(model, view);

  controller.run();
});
