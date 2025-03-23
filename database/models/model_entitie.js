const DB_Model_DEV = require("./model")

class DB_Model {
    #entitie
    constructor(title){
        this.#entitie = new DB_Model_DEV(title)
    }
    addFields(fields){
        return this.#entitie.addFields(fields)
    }
    addField(field){
        return this.#entitie.addField(field)
    }
    getFields(){
        return this.#entitie.getFields()
    }
}