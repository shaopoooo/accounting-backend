const mongoose = require('mongoose')
const logger = require('./logger')
const { mongo } = require('./env')

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = async () => {
  const { uri } = mongo

  try {
    await mongoose.connect(uri)
    logger.info('Connected to DB')
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`)
    process.exit(-1)
  }
}
