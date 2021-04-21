const ProductController = require('../controllers/productController')
const { authorizeAdmin } = require('../middlewares/auth')

router = require('express').Router()

router.get('/', ProductController.getProduct)
router.get('/:id', ProductController.getProductId)
router.post('/', ProductController.createProduct)
router.put('/:id', authorizeAdmin, ProductController.editProduct)
router.delete('/:id', authorizeAdmin, ProductController.deleteProduct)

module.exports = router