const mongoose = require('mongoose')
const mongooseConnection = require('../mongoose')

const GiftCodeSchema = new mongoose.Schema({
  code: String,
  description: String,
  type: {
    type: String,
    default: 'genshin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GiftCode = mongooseConnection().model('GiftCode', GiftCodeSchema)

module.exports = GiftCode
