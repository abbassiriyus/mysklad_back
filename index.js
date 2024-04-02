const express = require('express')
const app = express()
const ProductRouter=require("./routes/ProductRouter.js")
const CategoryRouter=require("./routes/CategoryRouter.js")
const userRouter=require("./routes/userRouter.js")
const companyRouter=require("./routes/companyRouter.js")
const bestSellerRouter=require("./routes/bestSellerRouter.js")
const topRouter=require("./routes/topRouter.js")
const tokenMoyklad=require("./routes/tokenMoyklad.js")
const dollorCourse=require("./routes/dollorCourse.js")

const carouselImageRouter=require('./routes/carouselImageRouter.js')


const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");



const cors=require('cors')
app.use(cors({origin: '*'}))

app.use(fileUpload())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('./uploads'))
app.use('/api',ProductRouter)
app.use('/',carouselImageRouter)

app.use('/api',companyRouter)
app.use('/api',bestSellerRouter)
app.use('/api',topRouter)


app.use('/',CategoryRouter)
app.use('/auth',userRouter)



app.use('/api',tokenMoyklad)
app.use('/api',dollorCourse)






app.listen(4004, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  