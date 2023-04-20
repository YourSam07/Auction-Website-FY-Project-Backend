const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { logger, logEvents } = require('./middleware/logger')
const { errorHandler } = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const port = process.env.PORT || 5757

connectDB()

const app = express()

app.use(logger)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/getSomething", require("./routes/userRoutes"))

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is running at ${port}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
