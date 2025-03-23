class PostUsers {
    #USERS = 'users'
    #name
    
    constructor(body){
        this.#name = body.name
    }
    async handle(db){
        const query = {
            text: 'INSERT INTO ' + this.#USERS + '(name) VALUES($1)',
            values: [this.#name],
          }
           
        await db.query(query)
        return
    }
}

module.exports = PostUsers