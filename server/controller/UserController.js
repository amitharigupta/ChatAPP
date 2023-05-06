const commonDBHelper = require("../database/helpers/User.model");
const responseHelper = require("./helper/responseHelper");
const { generateToken, generatePassword, comparePassword } = require("../utils/util.js");
const { Op } = require("sequelize");

module.exports = {
    createUser: async (req, res, next ) => {
        try {
            let { email, password } = req.body;
            let userExist = await commonDBHelper.getUserByQuery({email});
            if(userExist) {
                return res.status(409).send(responseHelper.error(409, "User Already Exist"));
            }
            let hashPassword = await generatePassword(password);
            req.body.password = hashPassword;
            let user = await commonDBHelper.createUser(req.body);
            user = JSON.parse(JSON.stringify(user));
            let token = await generateToken({ id: user.id, email });
            user.token = token;
            if(user) {
                return res.status(201).send(responseHelper.successWithResult(201, "User created successfully", user));
            } else {
                return res.status(400).send(responseHelper.error(400, "Something went wrong while creating user"));
            }
        } catch (exception) {
            return res.status(500).send(responseHelper.error(500, exception));
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            let user = await commonDBHelper.getUserByQuery({ email });
            if(!user) {
                return res.status(400).send(responseHelper.error(400, "User Not Exists"));
            }
            let isPasswordMatched = await comparePassword(user.password, password);
            if(!isPasswordMatched) {
                return res.status(401).send(responseHelper.error(401, "Invalid Username or Password"));
            }
            if(user && isPasswordMatched) {
                user = JSON.parse(JSON.stringify(user));
                let token = await generateToken({ id: user.id, email });
                user.token = token;
                return res.status(201).send(responseHelper.successWithResult(200, "User is Authenticated", user));
            } else {
                return res.status(401).send(responseHelper.error(401, "Invalid Username or Password"));
            }
        } catch (exception) {
            return res.status(500).send(responseHelper.error(500, exception));
        }
    },

    getAllUser: async (req, res, next) => {
        try {
            let { search: keyword, limit, offset }= req.query;
            if(keyword) {
                query = {
                    [Op.or]: [
                        {
                            firstName: 
                            {
                                [Op.like]: '%' + keyword + '%'
                            }
                        }, 
                        {
                            lastName: 
                            {
                                [Op.like]: '%' + keyword + '%'
                            }
                        }, 
                        {
                            email: 
                            {
                                [Op.like]: '%' + keyword + '%'
                            }
                        }
                    ],
                    id: { [Op.ne]: req.user.id }
                }
            } else {
                query = {};
            }
            let users = await commonDBHelper.getAllUser(query, limit, offset);
            if(users.length > 0) {
                return res.status(201).send(responseHelper.successWithResult(200, "User fetched successfully", users));
            } else {
                return res.status(400).send(responseHelper.error(400, "No User Found"));
            }
        } catch (exception) {
            return res.status(500).send(responseHelper.error(500, exception));
        }
    }
}