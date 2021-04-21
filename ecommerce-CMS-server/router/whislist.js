const WishlistController = require('../controllers/wishlistController')

const router = require('express').Router()

router.get('/', WishlistController.getWishlist)
router.post('/', WishlistController.addWishList)
router.delete('/:id', WishlistController.deleteWishList)

module.exports = router