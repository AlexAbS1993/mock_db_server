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
    describe('Суть Handlerа в том, чтобы совершить операцию с помощью метода handle. Внутри происходят небольшие операции.', () => {
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
            let str = usersPostHandler.createQuery(usersPostHandler.model.getFields(), usersPostHandler.constructDollars())
            expect(str).toMatch(EXPECTED_RESULT)
        })
    })
})