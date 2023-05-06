const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

module.exports = {
    generateToken: async (payload) => {
        try {
            let token = await jwt.sign(payload, process.env.JWT_SECRET);
            return token;
        } catch (error) {
            console.log(error);
        }
    },
    generatePassword: async(payload) => {
        try {
            let hashPassword = await bcrypt.hashSync(payload, 10);
            return hashPassword;
        } catch (error) {
            console.log(error);
        }
    },
    comparePassword: async (dbPassword, password) => {
        try {
            let isMatch = await bcrypt.compareSync(password, dbPassword);
            console.log(isMatch);
            if(isMatch) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}