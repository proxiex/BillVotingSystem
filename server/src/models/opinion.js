

module.exports = (sequelize, DataTypes) => {
  const Opinion = sequelize.define('Opinion', {
    billId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTERGER,
    },
    Opinion: {
      type: DataTypes.STRING
    }
  });

  Opinion.associate = (models) => {
    Opinion.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Opinion.belongsTo(models.Bills, {
      foreignKey: 'billId',
      onDelete: 'CASCADE',
    });
  };

  return Opinion;
};
