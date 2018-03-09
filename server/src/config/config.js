require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres',
    logging: false
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    logging: false
  },
  e2e: {
    use_env_variable: 'DATABASE_URL_E2E',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
