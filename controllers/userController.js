const getStuff = async(req, res) => {
  res.status(200).json({
    message: "shit working properly"
  })
}

module.exports = {
  getStuff,
}