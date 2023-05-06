const jwt = require("jsonwebtoken");
const responseHelper = require("../controller/helper/responseHelper");
const commonDBHelper = require("../database/helpers/User.model");

module.exports = {
    isAuthenticated: async (req, res, next) => {
        let token = req?.headers?.authorization;
        if(req?.headers?.authorization && token) {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                req.user = await commonDBHelper.getUserByQuery({ email: decoded.email, id: decoded.id });
                if(!req.user) {
                    return res.status(422).send(responseHelper.error(422, "You don't have access rights"));
                }
                next();
            } catch(exception) {
                console.log(exception);
                return res.status(500).send(responseHelper.error(500, "Server error occured"));
            }
        }
    }
}