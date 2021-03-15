import EventEmitter from './Emitter.js';
export default class Model extends EventEmitter {
    constructor() {
        super();
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        this.editedElement = ''
    }

    restart() {
        if (!JSON.parse(localStorage.getItem('todos'))) {
            localStorage.setItem('todos', JSON.stringify(this.todos))
        }
        this.emit('data modified', JSON.parse(localStorage.getItem('todos')))
    }

    add(text) {
        const date = new Date()
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: text,
            status: 'not done',
            published: date,
            parseDate: Date.parse(date)
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

        switch (event.value) {
            case ('Edit'):
                this.edit(event)
                break;
            case ('select-all'):
                this.selectAll()
                break;
            case ('Date'):
                this.sortByDate(event)
                break;
            case ('Status'):
                this.sortByStatus(event)
                break;
            default: return;
        }
    }

    sortByDate(event) {
        event.classList.toggle('sorted')
        if (event.classList.contains('sorted')) {
            this.todos.sort((a, b) => b.parseDate - a.parseDate)
        } else {
            this.todos.sort((a, b) => a.parseDate - b.parseDate)
        }
        this.commit(this.todos)
    }

    sortByStatus(event) {
        event.classList.toggle('sorted')
        if (event.classList.contains('sorted')) {
            this.todos.sort((a, b) => a.status > b.status ? 1 : -1)
        } else {
            this.todos.sort((a, b) => a.status < b.status ? 1 : -1)
        }
        this.commit(this.todos)
    }

    edit(event) {
        const editable = document.querySelectorAll('.editable')
        editable.forEach(input => {
            if (input.parentElement.parentElement.id === event.parentElement.parentElement.id) {
                this.editedElement = input
                this.editedElement.contentEditable = true
                this.editedElement.focus()
            }
        })
    }

    save(event) {
        if (this.editedElement.innerHTML === event.innerHTML) {
            const id = Number(event.parentElement.parentElement.id)
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
                    this.toggle(id)
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

    toggle(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                todo.status = todo.status === "not done" ? 'completed' : "not done"
            }
            return todo
        })
        this.commit(this.todos)
    }
}