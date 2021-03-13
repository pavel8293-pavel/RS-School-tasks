export default class Controller{
    constructor(model, view){
        this.model = model
        this.view = view
        model.on('data saved',(data) => this.view.render(data))
        view.on('data entered',(data) => this.model.add(data))
    }

    run(){
        this.view.render()
    }

}