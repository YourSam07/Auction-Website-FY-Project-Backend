const express = require('express')
const cors = require('cors')
const dotnev = require('dotenv').config()

const port = process.env.PORT || 5757

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})