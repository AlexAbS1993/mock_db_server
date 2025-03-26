const PostUsers = require("../handlers/postUsers")
const ModelFactory = require('../database/models/lib/model_factory')

describe('Handlers для Users занимаются реализацией задач, связанных с сущностью Users. В частности, создают запрос на получение и добавление user.', () => {
    const BODY = {
        name: 'Alex', 
        age: 31
    }
    const WRONG_BODY = {
        age: 31
    }
    const MODEL_TITLE = 'users'
    let prepareModel = new ModelFactory()
    let model = prepareModel.withTitle(MODEL_TITLE).withFields(['name', 'age']).build()
    let usersPostHandler = new PostUsers(BODY, model)
    beforeEach(() => {
        usersPostHandler = new PostUsers(BODY, model)
    })
    describe('POST HANDLER. Суть Handlerа в том, чтобы совершить операцию с помощью метода handle. Внутри происходят небольшие операции.', () => {
        test('Handler умеет конструировать список значений', () => {
            let values = usersPostHandler.constructValues()
            expect(Array.isArray(values)).toBe(true)
            expect(values[0]).toBe(BODY.name)
            expect(values[1]).toBe(BODY.age)
        })
        test('Handler умеет проставлять символы для базы данных', () => {
            let dollars = usersPostHandler.constructDollars()
            expect(Array.isArray(dollars)).toBe(true)
            expect(dollars[0]).toBe(`$1`)
            expect(dollars[1]).toBe(`$2`)
        })
        test('Handler правильно создаёт запрос к базе данных', () => {
            const EXPECTED_RESULT = 'INSERT INTO users(name, age) VALUES($1, $2)'
            let str = usersPostHandler.createQueryString(usersPostHandler.model.getFields(), usersPostHandler.constructDollars())
            expect(str).toMatch(EXPECTED_RESULT)
        })
        test('Error. При отсутствии одного из аргументов выдается ошибка во время создания сущности', () => {
            try{
                new PostUsers(BODY)
            }
            catch(e){
                expect(e.message).toMatch(usersPostHandler.errors.argument_missed)
            }
            try {
                new PostUsers()
            }
            catch(e){
                expect(e.message).toMatch(usersPostHandler.errors.argument_missed)
            }
        })
        test('Error. Если передана модель, не являющаяся результатом создания фабрики, то выдается ошибка', () => {
            try {
                new PostUsers(BODY, {model: true})
            }
            catch(e){
                expect(e.message).toMatch(usersPostHandler.errors.wrong_type)
            }
        })
        test('Error. Если передано тело запроса, не соответствующее требованиям для вставки по модели, то выдается ошибка на этапе конструирования значения', () => {
            try {
                let handler = new PostUsers(WRONG_BODY, model)
                handler.constructValues()
            }
            catch(e){
                expect(e.message).toMatch(usersPostHandler.errors.field_required)
            }
        })
    })
})