const DB_Model = require("./model_entitie")

class ModelFactory {
    #model
    withTitle(title){
        this.#model = new DB_Model(title)
        return this
    }
    withFields(fields){
        if(!this.#model){
            throw new Error('Необходимо задать имя')
        }
        this.#model.addFields(fields)
        return this
    }
    build(){
        let model = this.#model
        this.#model = undefined
        return model
    }
}

module.exports = ModelFactory