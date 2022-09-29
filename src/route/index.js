const router = require('express').Router()
const user = require('./user')

user(router)

module.exports = app => {
  app.use('/api', router)
  app.get('/ping', (res, req) => {
    req.send('success')
  })
}
