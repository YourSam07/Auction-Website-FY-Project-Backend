const express = require('express')
const router = express.Router()
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router