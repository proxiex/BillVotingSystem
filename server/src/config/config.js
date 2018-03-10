require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_PROD,
    password: process.env.PASSWORD_PROD,
    database: process.env.DB_PROD,
    dialect: 'postgres'
  },
  test: {
    username: process.env.USERNAME_TEST,
    password: process.env.PASSWORD_TEST,
    database: process.env.DB_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  e2e: {
    username: process.env.USERNAME_E23,
    password: process.env.PASSWORD_E2E,
    database: process.env.DB_E2E,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
