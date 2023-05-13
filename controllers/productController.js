const asyncHandler = require('express-async-handler') 
const User = require('../models/userModel')
const Products = require("../models/productModel")

// @desc Get all the products
// @route GET /products
const getAllProducts = asyncHandler(async(req, res) => {
  const products = await Products.find().lean().exec()

  if (!products.length){
    return res.status(400).json({ message: "No products to show"})
  }

  res.status(200).json(products)
})

// @desc Get Products of a particular User
// @route GET /products/:userId
const getProductsByUserId = asyncHandler(async(req, res) => {
  const products = await Products.find({user: req.params.userId})
  res.status(200).json(products)
})

// @desc Create Product or List product for auction
// @desc route POST /products
const createProduct = asyncHandler(async(req, res) => {
  const { uid, name, type, bid_start_time, bid_end_time, bid_start_price } = req.body

  if (!uid){
    res.status(400).json({message: "Require an user Id to add a product"})
  }
  
  if ( !name || !type || !bid_start_price ) {
    res.status(400).json({ message: "All fields are required" })
  }

  const productObj = {
    user: uid, name, type, bid_start_price, bid_end_time, bid_start_time
  }

  const product = await Products.create(productObj)

  if (product) {
    res.status(201).json({message: `New Product ${name} has been added.`})
  } else {
    res.status(400).json({message: "Invalid Product details"})
  }
})

// @desc Update the Product
// @route PATCH /products/
const updateProduct = asyncHandler(async(req, res) => {
  const {id, name, type, bid_end_time, bid_start_price, bid_start_time} = req.body

  if (!id) {
    res.status(400).json({message:"Need a product Id to update"})
  }

  const product = await Products.findById(id)

  if(!product){
    res.status(400).json({message: "Product not found"})
  }

  if (name) {product.name = name}
  if (type) {product.type = type}
  product.bid_start_time = bid_start_time
  product.bid_end_time = bid_end_time
  product.bidbid_start_price =bid_start_price

  const updatedProduct = await product.save()

  res.json({message: `Product (ID: ${id}) has been updated`})
})

//@desc Delete the product
//@route DELETE /products
const deleteProduct = asyncHandler(async(req, res) => {
  const {id} = req.body
  
  if(!id){
  res.status(400).json({message: "Need a product ID"})
  }

  const product = await Products.findById(id)

  if(!product) {
    res.status(400).json({message: "Product not found"})
  }

  const deletedProduct = await product.deleteOne()

  res.json({message: `Product ${deletedProduct.name} is deleted.`})
})


module.exports = {
  getAllProducts,
  getProductsByUserId,
  createProduct,
  updateProduct,
  deleteProduct
}