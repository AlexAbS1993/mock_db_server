const DB_Model_DEV = require("../database/models/lib/model")

describe('Модель является абстракцией сущности для работы с базами данных. Внутри неё описываются поля и требования валидации, ожидаемые при работе с базой данных. Планируется, что модель будет использоваться' + 
    ' для handlers. Из неё селекторы, работающие с базой данных, будут брать информацию о полях и проводить валидацию в соответствии с моделью.', 
    () => {
        const WRONG_TYPE_TITLE = true
        const ENTITIE_TITLE = 'TEST'
        const MODELS_FIELDS = ['name', 'age', 'adress']
        const WRONG_MODELS_FIELDS = ['name', true, 1]
        let model = new DB_Model_DEV(ENTITIE_TITLE)
        beforeEach(() => {
            model = new DB_Model_DEV(ENTITIE_TITLE)
        })
        describe('У модели есть неизменяемое поле title, которое можно получить по особому методу и установить только в конструкторе при инициализации.', () => {
            test('Title создаётся в конструкторе;', () => {
                model = new DB_Model_DEV(ENTITIE_TITLE)
                expect(model.title).toBe(ENTITIE_TITLE)
            })
            test('Title можно получить с помощью соответствующего метода;', () => {
                expect(model.getTitle()).toBe(ENTITIE_TITLE)
            })
            test('ERR. При передаче неверного title выбрасывается ошибка', () => {
                try{
                    new DB_Model_DEV(WRONG_TYPE_TITLE)
                }
                catch(e){
                    expect(e.message).toMatch(model.errors.must_be_a_string)
                }
                try {
                    new DB_Model_DEV('')
                }
                catch(e){
                    expect(e.message).toMatch(model.errors.empty_string)
                }
            })
        })
        describe('Модель может добавлять в себя новые поля и возвращать их список', () => {
            test('Модель включает в себя новое поле с помощью метода addField', () => {
                model.addField(MODELS_FIELDS[0])
                let fields = model.getFields()
                expect(fields[0]).toBe(MODELS_FIELDS[0])
            })
            test('Модель не допускает включения в себя одинаковых полей и удаляет дубликаты', () => {
                model.fields.push(MODELS_FIELDS[0])
                model.fields.push(MODELS_FIELDS[1])
                model.fields.push(MODELS_FIELDS[0])
                model.cutDuplicates()
                expect(model.getFields().length).toBe(2)
            })
            test('Модель может включать в себя сразу целый массив из полей', () => {
                model.addFields(MODELS_FIELDS)
                expect(model.getFields().length).toBe(MODELS_FIELDS.length)
            })
            test('Модель, добавляя массив из полей, пополняет имеющийся массив полей, а не заменяет его', () => {
                model.addField('1')
                model.addFields(MODELS_FIELDS)
                expect(model.getFields().length).toBe(MODELS_FIELDS.length + 1)
            })
            test('ERR. При попытке добавления с помощью addFields другого типа, кроме массива, выдается ошибка', () => {
                try {
                    model.addFields(WRONG_TYPE_TITLE)
                }
                catch(e){
                    expect(e.message).toMatch(model.errors.must_be_an_array)
                }
            })
            test('ERR. При попытке передать в addFields разные типы данных, выдается ошибка', () => {
                try {
                    model.addFields(WRONG_MODELS_FIELDS)
                }
                catch(e){
                    expect(e.message).toMatch(model.errors.every_must_be_a_string)
                }
            })
        })
    }
)