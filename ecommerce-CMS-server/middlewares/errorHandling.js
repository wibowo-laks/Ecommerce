function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    const message = err.errors.map(e => e.message)
    return res.status(400).json(message)
  } 
  
  else if (err.status == 400){
    return res.status(400).json({message: err.msg})
  } 
  
  else if (err.name == "Unauthorize" || err.name == "JsonWebTokenError"){
    return res.status(401).json({message: !err.msg ? "Authorization Invalid" : err.msg })
  } 
  
  else if (err.status == 403) {
    return res.status(403).json({ message: 'Forbidden' })
  } 
  
  else if (err.status == 404 || err.name == "notFound" || err.name == "SequelizeForeignKeyConstraintError"){
    return res.status(404).json({message: 'Data not found'})
  } 
  
  else {
    return res.status(500).json(err)
  }
}

module.exports = errorHandler