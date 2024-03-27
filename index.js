const express = require('express')
const app = express()
const ProductRouter=require("./routes/ProductRouter.js")
const CategoryRouter=require("./routes/CategoryRouter.js")

const cors=require('cors')
app.use(cors({origin: '*'}))


app.use('/api',ProductRouter)
app.use('/',CategoryRouter)









app.listen(4004, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  