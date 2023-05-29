const express = require('express')
const router = express.Router()
const { getAllProducts, getProductsByUserId, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
  .get(getAllProducts)
  .post(createProduct)
  .patch(updateProduct)
  .delete(deleteProduct)

router.route('/:userId').get(getProductsByUserId)

module.exports = router