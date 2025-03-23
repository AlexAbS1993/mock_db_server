class DB_Model_DEV {
    fields = []
    rules = {}
    title
    errors = {
        'must_be_an_array': 'Требуется массив',
        'every_must_be_a_string': 'Каждый элемент должен быть строкой',
        'must_be_a_string': 'Требуется строка',
        'empty_string': 'Пустая строка недопустима'
    }
    constructor(title){
        this.title = title
    }
    addFields(fields){
        this.addFields_validate(fields)
        for (let field of fields){
            this.fields.push(field)
        }
        this.cutDuplicates()
    }
    addFields_validate(fields){
        if (!Array.isArray(fields)){
            throw new Error(this.errors.must_be_an_array)
        }
        if (!fields.every(element => typeof element === 'string')){
            throw new Error(this.errors.every_must_be_a_string)
        }
    }
    cutDuplicates(){
        this.fields = new Set(this.fields)
        this.fields = Array.from(this.fields)
    }
    addField(field){
        this.addField_validate(field)
        this.fields.push(field)
        this.cutDuplicates()
    }
    addField_validate(field){
        if (typeof field != 'string'){
            throw new Error(this.errors.must_be_a_string)
        } 
        if (field.length === 0){
            throw new Error(this.errors.empty_string)
        }
    }
    getFields(){
        return this.fields
    }
    getTitle(){
        return this.title
    }
}

module.exports = DB_Model_DEV