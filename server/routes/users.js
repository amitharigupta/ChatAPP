var express = require('express');
var router = express.Router();
const UserController = require("../controller/UserController.js");

/* GET users listing. */
router.get('/', UserController.getAllUser);

router.post('/', UserController.createUser);

module.exports = router;
