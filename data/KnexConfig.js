const knex = require("knex");
const secrets = require("../secrets");
const knexConfig = require("../knexfile");

const env = secrets.env;
module.exports = knex(knexConfig[env]);