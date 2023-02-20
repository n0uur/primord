const mongoose = require('mongoose')
const mongooseConnection = require('../mongoose')

const SubscribeChnaelSchema = new mongoose.Schema({
  channelId: String,
  channelName: String,
  guildId: String,
  guildName: String,
  userId: String,
  userName: String,
  userTag: String,
  userAvatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const SubscribeChannel = mongooseConnection().model(
  'SubscribeChannel',
  SubscribeChnaelSchema
)

module.exports = SubscribeChannel
