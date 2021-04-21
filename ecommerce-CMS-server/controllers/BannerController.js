const { Banner } = require('../models')

class BannerController {
  static getBanners(req, res, next) {
    Banner.findAll({
      order: [['status', 'DESC']]
    }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      next(err)
    })
  }

  static createBanner(req, res, next) {
    const {title, status, image_url} = req.body
    Banner.create({title, status, image_url})
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
  })
  }

  static async editStatusBanner(req, res, next) {
    try {
      let id = req.params.id
      const data = await Banner.findByPk(id)
      if (!data) throw {status: 404}
      const {status} = req.body
      const banner = await Banner.update({status}, {
        where: {id},
        returning: true
      })
      res.status(200).json(banner[1][0])
    }catch(err) {
      next(err)
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const id = req.params.id
      const data = await Banner.findByPk(id)
      if (!data) throw {status: 404}
      let banner = await Banner.destroy({
        where: {
          id
        }
      })
      res.status(200).json({message: "Success delete banner"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BannerController
