let express = require('express')
let cors = require('cors')
let {Pool} = require('pg')
const { USERS, PRODUCTS } = require('./routes/routes')
const GetUsers = require('./handlers/usersHandler')

let app = express()
app.use(cors({
    origin: 'localhost'
}))

let db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

app.get(`/${USERS}`, async (req, res) => {
    console.log('get users')
    let users = new GetUsers(req.query).handle(db)    
    res.json(await (await users).rows)
})

app.get(`/${PRODUCTS}`, async(req, res) => {
    console.log('get products')
    res.end('products test')
})

app.listen(process.env.PORT, () => {
    console.log('Запущено на порте '+ process.env.PORT)
})