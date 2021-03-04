import View from './Viewer.js'
import Controller from './Controller.js'
import Model from './Model.js'

window.addEventListener('load', () => {
  const model = new Model(),
    view = new View({
      'numberButtons': document.querySelector('.number-buttons'),
      'modifyButtons': document.querySelector('.modify-buttons'),
      'computeButtons': document.querySelector('.compute-buttons'),
      'mainDisplay': document.getElementById('main-display'),
      'memoryDisplay': document.getElementById('memory-display'),
    }),
    controller = new Controller(model, view);
  view.show();
});