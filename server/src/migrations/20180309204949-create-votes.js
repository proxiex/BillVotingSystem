

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    billId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'bills',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    vote: {
      allowNull: false,
      type: Sequelize.ENUM('For', 'Against')
    },
    opinion: {
      type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('votes')
};
