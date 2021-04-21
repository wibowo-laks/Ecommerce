const request = require('supertest')
const { Category, sequelize, Product } = require('../models')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

let token_admin
let token_user
let CategoryId
let productId

afterAll(async (done) => {
  try {
  queryInterface.bulkDelete('Products', null, {})
  queryInterface.bulkDelete('Categories', null, {})
  sequelize.close()
  done()
  } catch (err) {
    done(err)
  }
})

beforeAll(async (done) => {
  try {
  const admin = {
    id: 1,
    email: 'admin@mail.com'
  }
  const user = {
    id: 2,
    email: 'user@mail.com'
  }
  token_admin = generateToken(admin)
  token_user = generateToken(user)
  category = await Category.create({name: 'sepatu'})
  CategoryId = category.id
  product = await Product.create({
    name: 'Adidas',
    image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
    price: 200000,
    stock: 4,
    CategoryId
  })
  productId = product.id
  done()
} catch (err) {
  console.log(err);
  done(err)
}
})

describe('GET /products', function() {
  it('Success ==> should return status 200 with data', (done) => {
    request(app)
      .get('/products')
      .set('access_token', token_admin)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toEqual(true)
        expect(typeof res.body[0].Category).toEqual('object')
        expect(res.body[0]).toHaveProperty('name')
        expect(res.body[0]).toHaveProperty('image_url')
        expect(res.body[0]).toHaveProperty('price')
        expect(res.body[0]).toHaveProperty('stock')
        expect(res.body[0]).toHaveProperty('CategoryId')
        done()
      })
  })

  it('Fail ==> Without passing access token, return 401 status code', (done) => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })
})

describe('POST /products', function() {
  it('Success ==> should return status 201 with newly created data', function (done) {
    let body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: 4,
      CategoryId
    }
    
    request(app)
    .post('/products')
    .set('access_token', token_admin)
    .send(body)
    .end((err, res) => {
      if(err) {
        done(err)
      }
      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('image_url')
      expect(res.body).toHaveProperty('price')
      expect(res.body).toHaveProperty('stock')
      expect(res.body).toHaveProperty('CategoryId')
      expect(typeof res.body.name).toEqual('string')
      expect(typeof res.body.image_url).toEqual('string')
      expect(typeof res.body.price).toEqual('number')
      expect(typeof res.body.stock).toEqual('number')
      expect(typeof res.body.CategoryId).toEqual('number')
      expect(res.body.name).toEqual(body.name)
      expect(res.body.image_url).toEqual(body.image_url)
      expect(res.body.price).toEqual(body.price)
      expect(res.body.stock).toEqual(body.stock)
      expect(res.body.CategoryId).toEqual(body.CategoryId)
      done()
    })
  })

  it('Fail ==> Without passing access token, return 401 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Fail ==> Invalid access token, return 401 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', 'eaugyfiqwbfbov.qwi018wbew9819facfwqbhr.aibiqwbd9bvao9')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        done()
      })
  })

  it('Fail ==> Product name not filled, return 400 status code', (done) => {
    const body = {
      name: '',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> stock filled with minus number, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: -4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> price filled with minus number, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: -200000,
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> price filled with string, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: "dua ratus ribu rupiah",
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> image url not filled, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: '',
      price: 200000,
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> price not filled, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: '',
      stock: 4,
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> stock not filled, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: '',
      CategoryId
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> CategoryId not filled, return 400 status code', (done) => {
    const body = {
      name: 'Adidas',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 200000,
      stock: 4,
      CategoryId: ''
    }
    request(app)
      .post('/products')
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })
})

describe('PUT /products', function() {
  it('Success ==> should return status 201 with newly update data', function (done) {
    let body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: 5,
      CategoryId
    }
    
    request(app)
    .put(`/products/${productId}`)
    .set('access_token', token_admin)
    .send(body)
    .end((err, res) => {
      if(err) {
        done(err)
      }
      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      done()
    })
  })

  it('Fail ==> Without passing access token, return 401 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: 5,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> Invalid access token, return 401 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: 5,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', 'eyxanefowev.qvciwebvboewnvowebsdi.anconqeoncwnvslv')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> name not filled, return 400 status code', (done) => {
    const body = {
      name: '',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: 5,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> image url not filled, return 400 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: '',
      price: 250000,
      stock: 5,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> invalid data type stock, return 400 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: 'lima',
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> price minus number, return 400 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: -200000,
      stock: 5,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })

  it('Fail ==> stock minus number, return 400 status code', (done) => {
    const body = {
      name: 'Adidas2',
      image_url: 'https://res.cloudinary.com/dv2hwbawa/image/upload/v1613856211/Adidas_NMD_R1.jpg',
      price: 250000,
      stock: -1,
      CategoryId
    }
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', token_admin)
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        done()
      })
  })
})

describe('DELETE /products', function() {
  it('Success ==> Success delete product, return 200 status code', function (done) {
    request(app)
    .delete(`/products/${productId}`)
      .set('access_token', token_admin)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.message).toEqual('string')
        done()
    })
  })

  it('Fail ==> Invalid access token, return 401 status code', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('access_token', 'eysajbewobaocqew.kiewbvoqwbn.qifbview')
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })

  it('Fail ==> Invalid productId, return 404 status code', (done) => {
    request(app)
      .delete(`/products/1000000`)
      .set('access_token', token_admin)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(404)
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})
