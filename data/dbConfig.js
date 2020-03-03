const knex = require('knex');
const knexConfig = require('../knexfile')

const env = process.env.DATABASE_ENV || "development";

//module.exports = knex(knexConfig[environment]);

module.exports = knex(knexConfig.development);