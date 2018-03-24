module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bills', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: 'Titile must be at least 3 characters in length'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: 35,
          msg: 'Description is not enough'
        }
      }
    },
    billProgress: {
      type: Sequelize.ENUM('Not enacted', 'Senate Voted', 'House Passed')
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
  down: queryInterface => queryInterface.dropTable('bills')
};
