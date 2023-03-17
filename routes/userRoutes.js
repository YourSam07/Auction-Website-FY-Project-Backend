const express = require('express')
const router = express.Router()
const {getStuff} = require('../controllers/userController')

router.get('/', getStuff)

module.exports = router