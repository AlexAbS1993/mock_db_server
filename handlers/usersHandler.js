class GetUsers {
    #limit
    #offset
    #USERS = 'users'
    #query_string
    constructor(query){
        this.#limit = query.limit
        this.#offset = query.offset
    }
    async handle(db){
        this.createQueryString()
        let users = await db.query(this.#query_string + ';')
        return users
    }
    createQueryString(){
        this.#query_string = `SELECT * FROM ${this.#USERS}`
        this.buildQueryString()
        return
    }
    buildQueryString(){
        this.addLimit()
        this.addOffset()
    }
    addLimit(){
        if (this.#limit){
            this.#query_string += ` LIMIT ${this.#limit}`
        }
    }
    addOffset(){
        if (this.#offset){
            this.#query_string +=  ` OFFSET ${this.#offset}`
        }
    }
}

module.exports = GetUsers