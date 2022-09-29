const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  chain: { type: String },
  ctx: { type: Object }
}, {
  timestamps: true
})

const db = mongoose.model('user', schema)

module.exports = {
  getUserInfo: async email => {
    const user = await db.find({ email })
    return user
  }
}
