if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./router') 
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(router)
app.use(errorHandler)

module.exports = app
