module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Username can not be empty'
        },
        len: {
          args: 3,
          msg: 'Username must be at least 3 characters in length'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          msg: 'Email address must be valid'
        },
        len: {
          args: 3,
          msg: 'Email must be at least 3 characters in length'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      len: {
        args: 6,
        msg: 'Password must be at least 6 characters in length'
      }
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue: 'No Image'
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('users')
};
