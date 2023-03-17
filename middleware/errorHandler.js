const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
  
  const statusCode =  res.statusCode ?  res.statusCode :  500
  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "prod" ? null : err.stack,
  })
}

module.exports = {
  errorHandler
}