const mongoose = require('mongoose')

module.exports = {
  url: 'mongodb://127.0.0.1:27017/interactiveComment',
  mongoose: mongoose,
  comment: require('./comment.model')(mongoose),
  user: require('./user.model')(mongoose)
}