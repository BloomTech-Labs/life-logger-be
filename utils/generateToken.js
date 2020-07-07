
const jwtToken = require("jsonwebtoken");
const secrets = require("../secrets.js");

module.exports = function generateToken(user) {
  const payload = {
    email: user.email,
    username: user.username
  };
  const options = {
    expiresIn: "360d"
  };
  return jwtToken.sign(payload, secrets.jwtSecret, options);
};