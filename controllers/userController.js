const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

// const getStuff = async(req, res) => {
//   res.status(200).json({
//     message: "shit working properly"
//   })
// }

// @desc Get all users
// @route GET /users
const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find().select('-password').lean()

  if (!users.length){
    return res.status(400).json({ message: "No users found"})
  }

  res.status(200).json(users)
})

// @desc Create a New User
// @route POST /users
const createUser = asyncHandler(async(req, res) => {
  const { username, password, email, roles } = req.body

  if (!username || !password || !email) {
    res.status(400).json({ message: "All fields are required."})
  }

  const duplicate = await User.findOne({username}).lean().exec()
  const duplicateEmail = await User.findOne({email}).lean().exec()

  if (duplicate) {
    res.status(409).json({ message: "A user already exists with this username"})
  }

  if (duplicateEmail){
    res.status(409).json({message: "A user already exists with this email."})
  }

  hashedpwd = await bcrypt.hash(password, 10)

  const userObj = { username, password: hashedpwd, email, roles}

  const user = await User.create(userObj)

  if (user){
    res.status(201).json({message: `New user ${username} created`})
  } else {
    res.status(400).json({message: "Invalid user details entered."})
  }
})

//@desc Update info of a user
//@route PATCH /users
const updateUser = asyncHandler(async (req, res) => {
  const {id, username, password, email } = req.body

  if (!id || !username || !email){
    res.status(400).json({message: 'All fields are required'})
  }
  const user = await User.findById(id)

  if(!user){
    res.status(400).json({ message: "User not found"})
  }

  const duplicate = await User.findOne({username}).lean().exec()
  const duplicateEmail = await User.findOne({email}).lean().exec()

  if ((duplicate || duplicateEmail) &&  (duplicate?._id.toString() !== id || duplicateEmail?._id.toString() !== id)){
    if (duplicate) {
      res.status(409).json({message: 'User with this username already exists.'})
    } else if (duplicateEmail) {
      res.status(409).json({message: 'User with this email already exists.'})
    }
  }

  user.username = username,
  user.email = email

  if (password) {
    user.password = await bcrypt.hash(password, 10)
  }

  const updatedUser = await user.save()

  res.json({message: `User ${username} has been updated.`})
})

//@desc Delete a user
//@route DELETE /users
const deleteUser = asyncHandler(async(req, res) => {
  const {id} = req.body

  if (!id){
    res.status(400).json({message: 'User Id required.'})
  }

  const user = await User.findById(id).exec()

  if(!user){
    res.status(400).json({ message: "User doesn't exist."})
  }

  const deletedUser = await user.deleteOne()

  res.json({message: `User with username ${deletedUser.username} and ID: ${deletedUser._id} is deleted.`})
})

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}