const environment =
  process.env.DATABASE_ENV || 'development';
const knex = require('knex');
const knexConfig = require('../knexfile')[environment];

const env = process.env.DATABASE_ENV || 'development';

module.exports = knex(knexConfig);
