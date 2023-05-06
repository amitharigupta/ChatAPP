const responseHelper = require("./helper/responseHelper");
const { chats } = require('../data/data');

module.exports = {
    getAllChats: async (req, res, next) => {
        try {
            return res.status(200).send(responseHelper.successWithResult(200, "Chat found", chats));
        } catch (error) {

        }
    },
    getChatById: async (req, res, next) => {
        try {
            let { id } = req.params;
            let filteredChat = chats.find((e) => {
                return e._id === id;
            })
            return res.status(200).send(responseHelper.successWithResult(200, "Chat found", filteredChat));

        } catch (exception) {
            log('Chat Controller : getChatById ', exception);
            return res.status(500).send(responseHelper.error(500, exception))
        }
    }
}