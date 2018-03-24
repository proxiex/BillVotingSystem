export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username can not be empty'
        },
        min: 3
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email address must be valid'
        },
        min: 3
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      Validate: {
        min: 6
      }
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
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  });

  user.associate = (models) => {
    user.hasMany(models.vote, {
      foreignKey: 'userId',
    });
  };

  return user;
};
