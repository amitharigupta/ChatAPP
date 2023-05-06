const UserModel = require("../models").User;


module.exports = {
    createUser: async (payload) => {
        try {
            let user = await UserModel.create(payload);
            let createdUser = await user.save();
            if(createdUser) return createdUser;
            else return false;
        } catch (exception) {
            console.log(error);
            log('User.model.js : createUser : ', exception);
            return false;
        }
    },
    getAllUser: async () => {
        try {
            let users = await UserModel.findAll();
            if(users) return users;
            else return false;
        } catch (exception) {
            log('User.model.js : getAllUser : ', exception);
            return false;
        }
    }
}