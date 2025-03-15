class PostUsers {
    #USERS = 'users'
    #name
    constructor(body){
        this.#name = body.name
    }
    async handle(db){
        await db.query(`INSERT INTO ${this.#USERS} VALUES(DEFAULT, ${this.#name})`)
        return users
    }
}

module.exports = PostUsers