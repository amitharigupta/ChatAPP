'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, {
        as: 'AdminUser',
        foreignKey: 'senderId',
        allowNull: true,
        targetKey: 'id'
      })
      Message.belongsTo(models.Chat, {
        as: 'ChatId',
        foreignKey: 'chatId',
        allowNull: true,
        targetKey: 'id'
      })
    }
  }
  Message.init({
    senderId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    content: DataTypes.STRING,
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
    sequelize,
    modelName: 'Message',
  });
  return Message;
};