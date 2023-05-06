const ChatController = require("../controller/ChatController.js");
const router = require('express').Router();

/* GET users listing. */
router.get('/all', ChatController.getAllChats);

router.get('/:id', ChatController.getChatById)

module.exports = router;
