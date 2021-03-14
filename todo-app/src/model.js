import EventEmitter from './Emitter.js';
export default class Model extends EventEmitter {
    constructor() {
        super();
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        this.editedElement = ''
    }

    restart() {
        if (JSON.parse(localStorage.getItem('todos'))) {
            this.emit('data saved', JSON.parse(localStorage.getItem('todos')))
        } else {
            this.emit('empty storage')
        }

    }

    add(text) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: text,
            status: 'not done',
        }
        if (text) {
            this.todos.push(todo)
            this.commit(this.todos)
        }
    }

    commit(list) {
        localStorage.setItem('todos', JSON.stringify(list))
        this.restart()

    }

    process(event) {
        if (event.value === 'Edit') {
            this.edit(event)
        }
        if (event.name === 'select-all') {
            this.selectAll()
        }
    }

    edit(event) {
        this.editedElement = event.parentElement.parentElement.children[2].children[0]
        this.editedElement.contentEditable = true
        this.editedElement.focus()
    }

    save(event) {
        if (this.editedElement.innerHTML === event.innerHTML) {
            const id = Number(event.parentElement.parentElement.children[0].innerHTML)
            this.editedElement.contentEditable = false
            this.saveStorage(id, event.innerHTML)
        }
    }

    saveStorage(id, updatedText) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                todo.text = updatedText
            }
            return todo
        })
        this.commit(this.todos)
    }

    selectAll() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectAll = document.getElementById('select-all');
        if (selectAll.checked) {
            checkboxes.forEach(checkbox => checkbox.checked = true)
        } else {
            checkboxes.forEach(checkbox => checkbox.checked = false)
        }


    }

    editList(data) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectAll = document.getElementById('select-all');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && !checkbox.name) {
                const id = Number(checkbox.parentElement.id)
                if (data.value === 'delete') {
                    selectAll.checked = false
                    this.delete(id)
                }
                if (data.value === 'complete') {
                    selectAll.checked = false
                    this.complete(id)
                }
            }
        })
    }
    deleteCompleted() {
        this.todos = this.todos.filter(todo => todo.status !== 'completed')
        this.commit(this.todos)
    }

    delete(id) {
        this.todos = this.todos.filter(todo => {
            return todo.id !== id
        })
        this.commit(this.todos)
    }

    complete(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                   todo.status = todo.status === "not done" ? 'completed' : "not done"
            }
            return todo
        })
        this.commit(this.todos)
    }
}