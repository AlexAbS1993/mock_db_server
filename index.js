let express = require('express')
let cors = require('cors')

let app = express()
app.use(cors({
    origin: 'localhost'
}))



app.listen(process.env.PORT, () => {
    console.log('Запущено на порте '+ process.env.PORT)
})