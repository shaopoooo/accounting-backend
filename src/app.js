const express = require('express')
const cors = require('cors')
const mongoose = require('./utils/mongoose')
const {
  port,
  env
} = require('./config/env')

const setupRoutes = require('../route')

const app = express()

app.use(express.json())

app.use(cors())

setupRoutes(app)

app.listen(port, async () => {
  console.log(`start at ${port} ${env}`)
  await mongoose.connect()
})

module.exports = app
