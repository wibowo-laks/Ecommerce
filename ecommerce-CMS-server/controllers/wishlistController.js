const { Wishlist, Product } = require('../models')

class WishlistController {
  static getWishlist(req, res, next) {
    Wishlist.findAll({ 
      where: { UserId: req.user.id },
      include: [Product]
    })
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  }

  static addWishList(req, res, next) {
    Wishlist.create({
      UserId: req.user.id,
      ProductId: req.body.ProductId
    })
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
  }

  static deleteWishList(req, res, next) {
    Wishlist.destroy({ where: { id: req.params.id }})
    .then(data => {
      if (!data) throw {status: 404}
      res.status(201).json(data)
    })
    .catch(err => next(err))
  }
}

module.exports = WishlistController