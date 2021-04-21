const express = require('express')
const CartController = require('../controllers/cartController')
const { authorizeCustomer } = require('../middlewares/auth')
const router = express.Router()

router.get('/', CartController.getCarts)
router.post('/', CartController.addCart)
router.put('/', CartController.checkout)
router.patch('/:id', authorizeCustomer, CartController.updateCart)
router.delete('/:id', authorizeCustomer, CartController.cancelCart)

module.exports = router