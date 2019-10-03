const jwt = require('jsonwebtoken');

module.exports = (name, time) => {
  return jwt.sign({name: name}, 'secret', {expiresIn: time});
}