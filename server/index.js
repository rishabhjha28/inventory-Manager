const dotenv  = require('dotenv')
dotenv.config({path:'./config.env'})
const express = require('express');
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const userRouter = require('./router/user');
app.use('/user', userRouter);

const productRouter = require('./router/product');
app.use('/product', productRouter);

const categoryRouter = require('./router/category');
app.use('/category', categoryRouter);

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server started successfully on port",port)
})