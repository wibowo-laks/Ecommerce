const request = require('supertest')
const { sequelize } = require('../models')
const app = require('../app')

describe('POST /user/login', () => {
  afterAll(done => {
    sequelize.close()
    done()
  })

  it('Success ==> return 200 status code', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: 'admin'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('access_token')
        expect(typeof res.body.access_token).toEqual('string')
        done()
    })
  })

  it('Failed ==> return 400 status code, empty email', (done) => {
    const body = {
      email: '',
      password: 'admin'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('email is required')
        done()
      })
    })

  it('Failed ==> return 400 status code, empty password', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: ''
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('password is required')
        done()
      })
  })

  it('Failed ==> return 400 status code, empty email & password', (done) => {
    const body = {
      email: '',
      password: ''
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('email and password is required')
        done()
      })
  })

  it('Failed ==> return 401 status code, insert wrong email', (done) => {
    const body = {
      email: 'tes@mail.com',
      password: 'admin'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('invalid email / password')
        done()
      })
  })

  it('Failed ==> return 401 status code, insert wrong password', (done) => {
    const body = {
      email: 'admin@mail.com',
      password: 'tes'
    }
    request(app)
      .post('/login')
      .send(body)
      .end((err, res) => {
        if(err) done(err)
        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(Array.isArray(res.body.message))
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('invalid email / password')
        done()
      })
  })

})