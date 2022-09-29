require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.API_PORT,
  mongo: {
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/?authSource=${process.env.DB_NAME}`
  }
}
