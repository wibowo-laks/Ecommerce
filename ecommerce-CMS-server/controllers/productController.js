const { Product, Category } = require ('../models')

class ProductController {
  static async createProduct (req, res, next){
    try {
      console.log(req.body);
      const { name, image_url, price, stock, CategoryId } = req.body
      let data = await Product.create({ name, image_url, price, stock, CategoryId })
      data = { name, image_url, price, stock, CategoryId }
      return res.status(201).json(data)
    } catch(err) {
        return next(err)
    }
  }

  static async getProduct (req, res, next){
    try {
      let product = await Product.findAll({
        include: [Category],
        order: [['updatedAt', 'ASC']]
      })
      res.status(200).json(product)
    } catch(err) {
      next(err)
    }
  }

  static async getProductId(req, res, next){
    try {
    const id = req.params.id
    const data = await Product.findByPk(id, {include: [Category]})
    if (!data) throw {status: 404}
    res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async editProduct (req, res, next){
    try {
    const id = req.params.id
    const data = await Product.findByPk(id)
    if (!data) throw {status: 404}
    let product = await Product.update({
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      CategoryId: req.body.CategoryId
    }, {
      where: {
        id
      },
      returning: true
    })
    res.status(200).json(product[1][0])
    } catch(err){
      next (err)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id
      const data = await Product.findByPk(id)
      if (!data) throw {status: 404}
      let product = await Product.destroy({
        where: {
          id
        }
      })
      res.status(200).json({message: "Success delete product"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController