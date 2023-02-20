const mongoose = require('mongoose')

const cache = {}

const mongooseConnection = () => {
  if (cache.connection) {
    return cache.connection
  }

  const connection = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  cache.connection = connection

  return connection
}

module.exports = mongooseConnection
