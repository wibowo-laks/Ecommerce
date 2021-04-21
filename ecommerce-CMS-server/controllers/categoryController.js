const { Category } = require ('../models')

class CategoryController {
  static createCategory (req, res, next) {
    const {name} = req.body
    Category.create({name})
    .then(data => res.status(201).json(data))
    .catch(err => next(err))
  }

  static getCategory(req, res, next) {
    Category.findAll({
      include: ['Products']
    }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      next(err)
    })
  }

  static getCategoryId(req, res, next) {
    let id = req.params.id
    Category.findByPk(id, {
      include: ['Products']
    }).then(data => {
      if (!data) next({ status: 404 })
        res.status(200).json(data)
    }).catch(err => {
      next(err)
    })
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id
      const data = await Category.findByPk(id)
      if (!data) throw {status: 404}
      let category = await Category.destroy({
        where: {
          id
        }
      })
      console.log(category);
      res.status(200).json({message: "Success delete category"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController