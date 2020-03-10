const environment =
  process.env.DATABASE_ENV || 'development';
const knex = require('knex');
const knexConfig = require('../knexfile.js')[environment];

module.exports = knex(knexConfig);
