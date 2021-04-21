const express = require('express')
const BannerController = require('../controllers/BannerController')
const CategoryController = require('../controllers/categoryController')
const UserController = require('../controllers/userController')
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/banners', BannerController.getBanners)
router.get('/categories', CategoryController.getCategory)
router.get('/categories/:id', CategoryController.getCategoryId)

module.exports = router