const bcrypt = require('bcrypt')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

function comparePassword(password, hashedPassword) {
  const compared = bcrypt.compareSync(password, hashedPassword)
  return compared
}

module.exports = {
  hashPassword,
  comparePassword
}