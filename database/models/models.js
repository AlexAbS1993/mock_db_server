const ModelFactory = require("./lib/model_factory")

const USERS_TITLE = 'users'
const PRODUCTS_TITLE = 'products'

const usersFields = ['name', 'age']
const productsFields = ['title', 'price']

let prepareModel = new ModelFactory()
let usersModel = prepareModel.withTitle(USERS_TITLE).withFields(usersFields).build()
let productsModel = prepareModel.withTitle(PRODUCTS_TITLE).withFields(productsFields).build()

module.exports = {usersModel, productsModel}