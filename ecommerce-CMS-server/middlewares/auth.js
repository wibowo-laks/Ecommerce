const { verifyToken } = require('../helpers/jwt')
const { User, Category, Product, Cart } = require('../models')

const authenticate = async (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.access_token)
    const user = await User.findOne({ where: { email: decoded.email } })

    if (!user) throw ({ name: 'Unauthorize' })
    req.user = user;
    return next();
  } catch(err) {
      return next(err)
    }
}

const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next()
    }
    else throw ({ name: 'Unauthorize' })
  } catch (err) {
      return next(err)
    }
}

const authorizeCustomer = async (req, res, next) => {
  try {
    let userId = +req.user.id
    let cart = await Cart.findByPk(+req.params.id)
    if (!cart) throw ({ status: 404 })
    if (req.user.role === 'customer' && cart.UserId == userId) {
      return next()
    }
    else throw ({ name: 'Unauthorize' })
  } catch (err) {
      return next(err)
    }
}

module.exports = {authenticate,authorizeAdmin,authorizeCustomer}