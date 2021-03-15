import Model from './model.js'
import View from './viewer.js'
import Controller from './controller.js'

window.addEventListener('load', () => {
  const model = new Model();
  const view = new View({
    inputField : document.getElementById('add-item'),
    addButton : document.getElementById('add-button'),
    todoTable : document.querySelector('.todo-table'),
    deleteBtn : document.getElementById('delete'),
    completeBtn : document.getElementById('complete'),
    deleteCopmpletedBtn : document.getElementById('delete-completed'),
  });
  const controller = new Controller(model, view);
  controller.run();
});