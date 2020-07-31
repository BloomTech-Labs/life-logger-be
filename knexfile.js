// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    useNullDefault: true,
    // connection: {
    //   host: process.env.POSTGRESS_DEV_HOST,
    //   port: process.env.POSTGRESS_DEV_PORT,
    //   user: process.env.POSTGRESS_DEV_USER,
    //   password: process.env.POSTGRESS_DEV_PASSWORD,
    //   database: process.env.POSTGRESS_DEV_DATABASE
    // }
    connection: `postgres://${process.env.POSTGRESS_DEV_USER}:${process.env.POSTGRESS_DEV_PASSWORD}@${process.env.POSTGRESS_DEV_HOST}:${process.env.POSTGRESS_DEV_PORT}/${process.env.POSTGRESS_DEV_DATABASE}`,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  testing: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRESS_DEV_HOST,
      port: process.env.POSTGRESS_DEV_PORT,
      user: process.env.POSTGRESS_DEV_USER,
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: process.env.POSTGRESS_DEV_DATABASE,
    },

    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
};
