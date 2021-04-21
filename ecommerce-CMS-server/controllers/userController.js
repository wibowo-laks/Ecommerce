const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const nodemailer = require('nodemailer')

class UserController {
  static login(req, res, next){
    let { email, password } = req.body
    if (!email && !password) throw ({ status: 400, msg: 'email and password is required' })
    if (!email) throw ({ status: 400, msg: 'email is required' })
    if (!password) throw ({ status: 400, msg: 'password is required' })
    User.findOne({ where: {email} })
    .then(user => {
      if(!user || !comparePassword(password, user.password)){
      throw ({ name: "Unauthorize", msg: 'invalid email / password'})
      }
      let payload = {
        id: user.id,
        email: user.email
      }
      let access_token = generateToken(payload)
      res.status(200).json({access_token, email})
    })
    .catch(err => next(err))
  }

  static register (req, res, next) {
    const email = req.body.email
    User.create({
      email,
      password: req.body.password
    })
    .then(data => {
        nodemailer.createTestAccount((err, account) => {
          if (err) {
            next(err)
            console.log('failed to create testing account' + err.message)
            return process.exit(1)
          }
          console.log('sending message')
          const transporter = nodemailer.createTransport({
          //maaf pake akun gmail waktu pair project, males bikin akun gmail lagi :D
            service: 'gmail',
            auth: {
              user: 'pphacktiv8',
              pass: 'h8PairProject'
            }
          });

          let message = {
            from: "MyStore",
            to: email,
            subject: "Success Register",
            html: `<b><h3>${email} has been registered</h3></b>`
          };

          transporter.sendMail(message, (err, info) => {
            if (err) {
                next(err)
                console.log('error : ' + err.message)
                return process.exit(1)
            }
          console.log('Message sent: $s' + info.messageId)
          // console.log('Message sent: $s' + info.messageId)
          })
        })
      res.status(201).json({
        id: data.id,
        email: data.email,
        role: data.role
      })
    })
    .catch(err => next(err))
  }
}

module.exports = UserController