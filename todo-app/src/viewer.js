import EventEmitter from './emitter.js'
import DOMelement from './DOMcreater.js'
export default class View extends EventEmitter {
    constructor(elements) {
        super();
        this.elements = elements
        this.input = this.elements.inputField
        elements.addButton.addEventListener('click', () => this.emit('data entered', this.input.value));
        elements.todoTable.addEventListener('click', (event) => this.emit('table clicked',event.target));
        elements.todoTable.addEventListener('focusout', (event) => this.emit('data edited', event.target));
        elements.completeBtn.addEventListener('click', (event) => this.emit('data to complete',event.target));
        elements.deleteBtn.addEventListener('click', (event) => this.emit('data to delete',event.target));
        elements.deleteCopmpletedBtn.addEventListener('click', (event) => this.emit('completed data to delete',event.target));

    }

    reset() {
        this.input.value = ''
        return this.input.value
    }

    remove() {
        const tableElements = document.querySelector('.todo-table')
        Array.from(tableElements.children).forEach(child => {
            if (child.classList.contains('table-item')) {
                child.remove()
            }
        })
    }

    render(todos) {
        this.reset()
        this.remove()
        todos.forEach((todo,idx)=> {
            const row = new DOMelement('tr', 'table.todo-table', 'table-item', todo.id, 
            `<td>${idx+1}</td><input type ="checkbox">
            </input><td><span class="editable" contenteditable ="false">${todo.text}</span></td>
            <td>${todo.status}</td>
            <td><input type="button" class="edit-button" value="Edit"></td>
            <td>${todo.published}</td>`)
        });
    }
}