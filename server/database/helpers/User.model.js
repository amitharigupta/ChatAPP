const UserModel = require("../models").User;

module.exports = {
  createUser: async (payload) => {
    try {
      let user = await UserModel.create(payload, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      });
      let createdUser = await user.save();
      if (createdUser) return createdUser;
      else return false;
    } catch (exception) {
      console.log(error);
      log("User.model.js : createUser : ", exception);
      return false;
    }
  },
  getAllUser: async (query, limit, offset) => {
    try {
      let users = await UserModel.findAll({
        where : query,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
        offset: offset,
        limit: limit    
      });
      if (users) return users;
      else return false;
    } catch (exception) {
      log("User.model.js : getAllUser : ", exception);
      return false;
    }
  },
  getUserByQuery: async (query) => {
    try {
      let user = await UserModel.findOne({ where: query });
      if (user) return user;
      else return false;
    } catch (error) {
      return false;
    }
  },
};
