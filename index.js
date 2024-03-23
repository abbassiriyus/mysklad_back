const express = require('express')
const app = express()
const ProductRouter=require("./routes/ProductRouter.js")
const cors=require('cors')
app.use(cors({origin: '*'}))


app.use('/api',ProductRouter)









app.listen(4003, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  