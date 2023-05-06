'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        as: 'Users',
        foreignKey: 'userId',
        allowNull: true,
        targetKey: 'id'
      });
      Chat.belongsTo(models.Message, {
        as: 'Messages',
        foreignKey: 'latestMessageId',
        allowNull: true,
        targetKey: 'id'
      });
      Chat.belongsTo(models.User, {
        as: 'AdminUser',
        foreignKey: 'groupAdminId',
        allowNull: true,
        targetKey: 'id'
      })
    }
  }
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    chatName: { type: DataTypes.STRING, trim: true, allowNull: false },
    isGroupChat: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: DataTypes.INTEGER,
    latestMessageId: DataTypes.INTEGER,
    groupAdminId: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};