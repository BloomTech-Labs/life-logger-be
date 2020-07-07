  
const bcrypt = require("bcryptjs");



module.exports =  hashPass = (password) => {
    const hash = bcrypt.hashSync(password, 12);
    return hash
}