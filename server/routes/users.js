var express = require('express');
var router = express.Router();
const UserController = require("../controller/UserController.js");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

/* GET users listing. */
router.get('/all',  AuthMiddleware.isAuthenticated, UserController.getAllUser);

router.post('/register', UserController.createUser);

router.post('/login', UserController.login)

module.exports = router;
