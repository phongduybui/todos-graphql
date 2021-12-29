const Task = require('./taskModel');
const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
const { sequelize, Sequelize } = require('../configs/DBconfig');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'https://ui-avatars.com/api/?background=random&color=fff',
  },
  provider: {
    type: DataTypes.STRING(10),
    defaultValue: 'system',
  },
});

User.hasMany(Task, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

User.beforeSave(async (user) => {
  const salt = await bcrypt.genSalt(6);
  user.password = await bcrypt.hash(user.password, salt);

  user.avatar = `https://ui-avatars.com/api/?background=random&color=fff&name=${user.user_name}`;
});

User.prototype.matchPassword = async function (enteredPassword) {
  const password = this.get().password;
  return await bcrypt.compare(enteredPassword, password);
};

module.exports = User;
