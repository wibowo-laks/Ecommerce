const CategoryController = require('../controllers/categoryController')
const { authorizeAdmin } = require('../middlewares/auth')

router = require('express').Router()

router.get('/', CategoryController.getCategory)
router.get('/:id', CategoryController.getCategoryId)
router.post('/', CategoryController.createCategory)
router.delete('/:id', authorizeAdmin, CategoryController.deleteCategory)

module.exports = router