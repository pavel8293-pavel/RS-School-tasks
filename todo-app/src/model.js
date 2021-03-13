import EventEmitter from './Emitter.js';
import DOMelement from './DOMcreater.js'
export default class Model extends EventEmitter {
    constructor() {
        super();
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }


    add(text) {
        console.log(text)
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: text,
            status: 'not done',
        }
        if (text) {
            this.todos.push(todo)
            this.commit(this.todos)
            this.create(this.todos)
        }
    }

    commit(todos) {
        this.emit('data saved', todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    create(todos){
        todos.forEach(todo => {
            const row = new DOMelement('tr', 'table.todo-table', 'table-topic', `<td>${todo.id}</td><td>${todo.text}</td><td>${todo.status}</td>`)
            console.log(row)
        });
    }



}