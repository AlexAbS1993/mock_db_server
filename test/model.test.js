const DB_Model_DEV = require("../database/models/model")

describe('Модель является абстракцией сущностей для работы с базами данных. Внутри неё описываются поля и требования валидации, ожидаемые при работе с базой данных. Планируется, что модель будет использоваться' + 
    ' для handlers. Из неё селекторы, работающие с базой данных, будут брать информацию о полях и проводить валидацию в соответствии с моделью.', 
    () => {
        const ENTITIE_TITLE = 'TEST'
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
        })
        describe('Модель может добавлять в себя новые поля и возвращать их список', () => {
            test('Модель включает в себя новое поле с помощью метода addField', () => {
                model.addField('name')
                let fields = model.getFields()
                expect(fields[0]).toBe('name')
            })
            test('Модель не допускает включения в себя одинаковых полей и удаляет дупликаты', () => {
                model.fields.push('name')
                model.fields.push('age')
                model.fields.push('name')
                model.cutDuplicates()
                expect(model.getFields().length).toBe(2)
            })
        })
    }
)