export default (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    billId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vote: {
      type: DataTypes.ENUM('For', 'Against'),
      allowNull: false
    },
    opinion: {
      type: DataTypes.STRING
    }
  });

  vote.associate = (models) => {
    vote.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    vote.belongsTo(models.bill, {
      foreignKey: 'billId',
      onDelete: 'CASCADE',
    });
  };
  return vote;
};
