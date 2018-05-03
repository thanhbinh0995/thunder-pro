import {User} from "../../models/index";
import {MessageRepository} from "../../repositories";
const messageRepository = new MessageRepository();

module.exports = function () {
    const members = new Map();
    let chatHistory = [];

    function broadcastMessage(message) {
        members.forEach(m => m.emit('message', message))
    }

    function broadcastTyping(message) {
        members.forEach(m => m.emit('typing', message))
    }

    function addEntry(entry) {
        chatHistory = chatHistory.concat(entry)
    }

    async function getChatHistory(chatroomId, offset=0) {
        return await messageRepository.find({
            include: {
                model: User,
                attributes: ['id', 'username', 'role', 'avatar'],
            },
            where: {
                groupId: chatroomId
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 20,
            offset: offset,
        });
    }

    function addUser(client) {
        members.set(client.id, client)
    }

    function removeUser(client) {
        members.delete(client.id)
    }

    return {
        broadcastMessage,
        broadcastTyping,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
    }
};
