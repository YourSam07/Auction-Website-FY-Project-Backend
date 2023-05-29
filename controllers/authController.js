const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Login User
// @route /auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body

  if (!username || !password) {
    res.status(400).json({ message: "All fields are required" })
  }

  const user = await User.findOne({ username })

  if (!user || (await !bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Unauthorized" })
  }

  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "username": user.username,
        "roles": user.roles
      },
    },
    `${process.env.JWT_SECRET_KEY}`,
    // { expiresIn: '5d' }
  )

  res.json({ username, accessToken, roles, uid: user._id })
})

module.exports = {
  loginUser
}