const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  sold_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer'
  },
  type: {
    type: String,
    required: true
  },
  bid_start_time: {
    type: Date,
  },
  bid_end_time: {
    type: Date,
  }, 
  bid_start_price: {
    type: Number
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("Products", productSchema)