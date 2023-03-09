const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URL)
  .then((response) => {
    console.log(`MongoDB server connected: ${response.connection.host}`)
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = connectDB