import Model from './model.js'
import View from './viewer.js'
import Controller from './controller.js'

window.addEventListener('load', () => {
  const model = new Model();
  const view = new View({
    inputField : document.getElementById('add-item'),
    addButton : document.getElementById('add-button'),
   // todoList : document.querySelector('.todo-list'),
  });
  const controller = new Controller(model, view);
  controller.run();
});