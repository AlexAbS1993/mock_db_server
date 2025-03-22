let express = require('express')
let cors = require('cors')
let {Pool} = require('pg')
const { USERS, PRODUCTS } = require('./routes/routes')
const GetUsers = require('./handlers/usersHandler')
const PostUsers = require('./handlers/postUsers')


const APP_NAME = 'test_server_for_shooting'

let app = express()
app.use(cors({
    origin: 'localhost'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
let db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    application_name: APP_NAME
})

db.connect()
app.get(`/${USERS}`, async (req, res) => {
    console.log('get users')
    let users = new GetUsers(req.query).handle(db)    
    res.json(await (await users).rows)
})

app.get(`/${PRODUCTS}`, async(req, res) => {
    console.log('get products')
    res.end('products test')
})

app.post(`/${USERS}`, async (req, res) => {
    console.log('Post Users')
    let body = req.body
    try{
        new PostUsers(body).handle(db)
    }
    catch(e){
        res.end(e.message)
    }
    res.end('Success')
})
app.post(`/${PRODUCTS}`, async (req, res) => {
    console.log('Post Products mock')
    let body = req.body
    res.end('Success')
})
app.listen(process.env.PORT, () => {
    console.log('Запущено на порте '+ process.env.PORT)
})