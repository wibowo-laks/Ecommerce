const express = require('express')
const BannerController = require('../controllers/BannerController')
const { authorizeAdmin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', BannerController.getBanners)
router.post('/', BannerController.createBanner)
router.patch('/:id', authorizeAdmin, BannerController.editStatusBanner)
router.delete('/:id', authorizeAdmin, BannerController.deleteBanner)

module.exports = router