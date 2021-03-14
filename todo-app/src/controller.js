export default class Controller{
    constructor(model, view){
        this.model = model
        this.view = view
        model.on('data saved',(data) => this.view.render(data))
        model.on('empty storage',() => this.view.reset())
        view.on('data entered',(data) => this.model.add(data))
        view.on('data to delete',(data) => this.model.editList(data))
        view.on('completed data to delete',() => this.model.deleteCompleted())
        view.on('data to complete',(data) => this.model.editList(data))
        view.on('table clicked',(event) => this.model.process(event))
        view.on('data edited',(event) => this.model.save(event))
    }

    run(){
        this.model.restart()
    }

}