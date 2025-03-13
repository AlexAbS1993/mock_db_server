class GetUsers {
    #limit
    #offset
    #USERS = 'users'
    constructor(query){
        this.#limit = query.limit
        this.#offset = query.offset
    }
    async handle(db){
        let users = await db.query(`SELECT * FROM ${this.#USERS}` + ';')
        return users
    }
}

module.exports = GetUsers