// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    useNullDefault: true,
    connection: {
      host: process.env.POSTGRESS_DEV_HOST,
      port: process.env.POSTGRESS_DEV_PORT,
      user: process.env.POSTGRESS_DEV_USER,
      password: process.env.POSTGRESS_DEV_PASSWORD,
      database: process.envPOSTGRESS_DEV_DATABASE
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL,
      user:     'username',
      password: 'password' 
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL,
      user:     'username',
      password: 'password'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
  }
}
