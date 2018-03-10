

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Votes, {
      foreignKey: 'userId',
    });

    User.hasMany(models.Opinions, {
      foreignKey: 'userId',
    });
  };

  return User;
};
