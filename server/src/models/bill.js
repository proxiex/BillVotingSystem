export default (sequelize, DataTypes) => {
  const bill = sequelize.define('bill', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    billProgress: {
      type: DataTypes.ENUM('Not enacted', 'Senate Voted', 'House Passed')
    }
  });
  bill.associate = (models) => {
    bill.hasMany(models.vote, {
      foreignKey: 'billId',
    });
  };
  return bill;
};
