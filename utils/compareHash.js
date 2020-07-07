  
const bcrypt = require("bcryptjs");



module.exports = compareHash = (bodyPass, DBPass) => bcrypt.compareSync(bodyPass, DBPass)