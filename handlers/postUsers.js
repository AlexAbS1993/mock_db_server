const DB_Model = require("../database/models/lib/model_entitie")

class PostUsers {
    #models_instance_name = 'DB_Model'
    #USERS = 'users'  
    errors = {
        'field_required': 'В теле запроса не хватает поля',
        'argument_missed': 'Инициализация невозможна. Отсутствует аругмент',
        'wrong_type': 'Недопустимый тип, требуется '
    }
    constructor(body, model){
        this.validateArguments(body, model)
        this.model = model
        this.body = body
    }
    validateArguments(body, model){
        if (!body || !model){
            throw new Error(this.errors.argument_missed)
        }
        if (!(model instanceof DB_Model)){
            throw new Error(this.errors.wrong_type + this.#models_instance_name)
        }
    }
    async handle(db){
        let fields = this.model.getFields()
        let values = this.constructValues()
        let dollars = this.constructDollars()
        const query = {
            text: this.createQueryString(fields, dollars),
            values,
          }
           
        await db.query(query)
        return
    }
    createQueryString(fields, dollars){
        return `INSERT INTO ${this.#USERS}(${fields.join(', ')}) VALUES(${dollars.join(', ')})`
    }
    constructValues(){
        let fields = this.model.getFields()
        let result = []
        fields.forEach(field => {
            if (!this.body[field]){
                throw new Error(this.errors.field_required + field)
            }
            else {
                result.push(this.body[field])
            }
        });
        return result
    }
    constructDollars(){
        let result = []
        let fieldsCount = this.model.getFields().length
        for (let i = 1; i <= fieldsCount; i++){
            result.push(`$${i}`)
        }
        return result
    }
}

module.exports = PostUsers