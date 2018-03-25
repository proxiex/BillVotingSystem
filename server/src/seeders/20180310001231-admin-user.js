const bcrypt = require('bcrypt');

const password = 'password';

module.exports = {
  up: queryInterface =>

    queryInterface.bulkInsert('users', [{
      username: 'Admin',
      email: 'admin@localhost',
      password: bcrypt.hashSync(password, 10),
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('users', null, {})
};
