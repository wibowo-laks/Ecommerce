const { Cart, Product, sequelize } = require('../models')

class CartController {
  static getCarts (req, res, next) {
    let userId = req.user.id
    Cart.findAll({
      where: {
        UserId: userId
      },
      include: [Product]
    }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      next(err)
    })
  }

  static addCart(req, res, next) {
    let UserId =  +req.user.id
    let ProductId = +req.body.productId
    let quantity = +req.body.quantity
    let stock
    Product.findOne({
      where: {
        id: ProductId
      }
    }).then(data => {
      if(data) {
        stock = data.stock
        return Cart.findOne({
          where: {
            UserId,
            ProductId,
            checkout: false
          }
        })
      } else {
        next({ status: 404 })
      }
    })
    .then(data => {
      if(data) {
        let newQty = data.quantity + quantity
        console.log(newQty);
        console.log(stock);
        if(stock >= newQty) {
          let newData = {
            ProductId,
            UserId,
            quantity: newQty
          }
          return Cart.update(newData, {
            where: {
              id: data.id
            },
            returning: true
          })
        } else {
          throw({
            status: 400,
            msg: "Not enough stock"
          })
        }
      } else {
        if(stock >= quantity) {
          let newData = {
            ProductId,
            UserId,
            quantity
          }
          return Cart.create(newData)
        } else {
          throw({
            status: 400,
            msg: "Not enough stock"
          })
        }
      }
    }).then(data => {
      if(data) {
        if (Array.isArray(data)) {
          res.status(200).json(data[1][0])
        } else {
          res.status(201).json(data)
        }
      } else {
        throw({
          status: 400,
          msg: "Not enough stock"
        })
      }
    }).catch(err => {
      next(err)
    })
  }

  static updateCart(req, res, next) {
    let id = req.params.id
    console.log(req.params, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    let quantity = +req.body.quantity
    Cart.findByPk(id, {
      include: [Product]
    }).then(data => {
      if(data) {
        let stock = data.Product.stock
        let newQty = data.quantity + quantity
        if(stock >= newQty) {
          let newData = {
            quantity: newQty
          }
          return Cart.update(newData, {
            where: { id },
            returning: true
          })
        } else {
          throw({
            status: 400,
            msg: "Not enough stock"
          })
        }
      } else {
        throw({ status: 404 })
      }
    })
    .then(data => {
      res.status(200).json(data[1][0])
    }).catch(err => {
        next(err)
    })
  }

  static cancelCart(req, res, next) {
    Cart.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (!data) throw { status: 404 }
      res.status(200).json({message: "Success for cancel cart"})
    })
    .catch(err => next(err))
  }

  static async checkout(req, res, next) {
    const transaction = await sequelize.transaction()
    try {
      const UserId = req.user.id
      const carts = await Cart.findAll({
        where: {
          UserId,
          checkout: false
        },
        include: [Product]
      })
      try {
        let errors = []
        for (const cart of carts) {
          const CartId = cart.id
          const ProductId = cart.ProductId
          const quantity = cart.quantity
          let product
          let data
          const checkStock = await Product.findByPk(ProductId)
          if(checkStock.stock >= quantity) {
            product = await Product.decrement({
              stock: quantity
            },{
              where: {
                id: ProductId
              },
              transaction
            })
          } 
          if (product) {
            data = await Cart.update({
              checkout: true
            },{
              where: {
                id: CartId
              },
              transaction,
              returning: true
            })
          } else {
            errors.push({
              message: `${checkStock.name} not enough stock`
            })
          }     
        }
        if (!errors.length) {
          await transaction.commit()
          res.status(200).json({
            message: "Success Checkout"
          })
        } else {
          await transaction.rollback()
          next({
            status: 400,
            errors: errors
          })
        }
      } catch (err) {
        await transaction.rollback()
        next(err)
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = CartController