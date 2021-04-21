const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)

module.exports = router