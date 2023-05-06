const commonDBHelper = require("../database/helpers/User.model");
const responseHelper = require("./helper/responseHelper");

module.exports = {
    createUser: async (req, res, next ) => {
        try {
            let user = await commonDBHelper.createUser(req.body);
            if(user) {
                return res.status(201).send(responseHelper.successWithResult(201, "User created successfully", user));
            } else {
                return res.status(400).send(responseHelper.error(400, "Something went wrong while creating user"));
            }
        } catch (exception) {
            return res.status(500).send(responseHelper.error(500, exception));
        }
    },

    getAllUser: async (req, res, next) => {
        try {
            let users = await commonDBHelper.getAllUser();
            if(users.length > 0) {
                return res.status(201).send(responseHelper.successWithResult(200, "User fetched successfully", users));
            } else {
                return res.status(400).send(responseHelper.error(400, "Something went wrong while fetching user"));
            }
        } catch (exception) {
            return res.status(500).send(responseHelper.error(500, exception));
        }
    }
}