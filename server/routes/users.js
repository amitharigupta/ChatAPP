var express = require('express');
var router = express.Router();
const UserController = require("../controller/UserController.js");

/* GET users listing. */
router.get('/all', UserController.getAllUser);

router.post('/register', UserController.createUser);

router.post('/login', UserController.login)

module.exports = router;
