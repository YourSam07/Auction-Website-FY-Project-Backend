const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    default: 'user'
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("User Schema", userSchema)