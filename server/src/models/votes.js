

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    billId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTERGER,
      allowNull: false
    },
    vote: {
      type: DataTypes.ENUM('For', 'Against'),
      allowNull: false
    }
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Vote.belongsTo(models.Bills, {
      foreignKey: 'billId',
      onDelete: 'CASCADE',
    });
  };
  return Vote;
};
