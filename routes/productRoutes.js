const express = require('express')
const router = express.Router()
const { getAllProducts, getProductsByUserId, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .patch(updateProduct)
  .delete(deleteProduct)

router.route('/:userId').get(getProductsByUserId)

module.exports = router