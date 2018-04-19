import {GroupRepository, MessageRepository} from "../../repositories";
const messageRepository = new MessageRepository();
const groupRepository = new GroupRepository();

export default function makeHandleEvent(client, clientManager, chatroomManager) {
    async function ensureExists(getter, rejectionMessage) {
        return await new Promise(function (resolve, reject) {
            const res = getter()
            return res
                ? resolve(res)
                : reject(rejectionMessage)
        })
    }

    async function ensureUserSelected(clientId) {
        return await ensureExists(
            () => clientManager.getUserByClientId(clientId),
            'select user first'
        )
    }

    async function ensureValidChatroom(chatroomId) {
        return await ensureExists(
            () => chatroomManager.getChatroomByName(chatroomId),
            `invalid chatroom name: ${chatroomId}`
        )
    }

    async function ensureValidChatroomAndUserSelected(chatroomId) {
        return await Promise.all([
            ensureValidChatroom(chatroomId),
            ensureUserSelected(client.id)
        ])
            .then(([chatroom, user]) => Promise.resolve({chatroom, user}))
    }

    function handleEvent(chatroomId, createEntry) {
        return ensureValidChatroomAndUserSelected(chatroomId)
            .then(function ({chatroom, user}) {
                // add message to chat history, database
                let entry = {};
                if (user) {
                    entry = {User: user, ...createEntry()};
                }
                else {
                    entry = {...createEntry()};
                }
                if (entry.message) {
                    const data = {
                        userId: user.id,
                        groupId: chatroomId,
                        type: 'text',
                        message: entry.message
                    };
                    messageRepository.create(data);
                    const groupUpdateData = {
                        lastMessage: entry.message,
                        lastMessageTime: new Date()
                    };
                    groupRepository.update(groupUpdateData, {
                        where: {
                            id: chatroomId
                        }
                    })
                }
                chatroom.addEntry(entry);

                // notify other clients in chatroom
                if (entry.typing) {
                    chatroom.broadcastTyping({groupId: chatroomId, ...entry});
                } else {
                    chatroom.broadcastMessage({groupId: chatroomId, ...entry});
                }
                return chatroom
            })
    }

    return handleEvent
}

module.exports = function (client, clientManager, chatroomManager) {
    const handleEvent = makeHandleEvent(client, clientManager, chatroomManager);

    async function handleRegister(userId) {
        const user = await clientManager.getUserById(userId);
        clientManager.registerClient(client, user);
        const groups = await chatroomManager.getGroupsByUserID(userId);
        chatroomManager.registerChatrooms(client, groups);
        return user
    }

    async function handleJoin(chatroomId, callback) {
        const createEntry = () => ({event: `joined ${chatroomId}`});
        try {
            const chatroom = await handleEvent(chatroomId, createEntry);
            chatroom.addUser(client);
            const chatHistory = await chatroom.getChatHistory(chatroomId);
            callback(null, chatHistory.reverse());
        } catch (e) {
            callback()
        }
    }

    function handleLeave(chatroomId, callback) {
        const createEntry = () => ({event: `left ${chatroomId}`});

        handleEvent(chatroomId, createEntry)
            .then(function (chatroom) {
                // remove member from chatroom
                chatroom.removeUser(client.id);

                callback(null)
            })
            .catch(callback)
    }

    async function handleMessage({userId, chatroomId, message} = {}, callback) {
        const createEntry = () => ({message});
        try {
            const chatroom = await handleEvent(chatroomId, createEntry);
            callback(null);
        } catch (e) {
            callback()
        }
    }

    async function handleTyping({chatroomId, typing} = {}) {
        const createEntry = () => ({typing});
        try {
            const chatroom = await handleEvent(chatroomId, createEntry);
        } catch (e) {
            console.log(e)
        }
    }

    async function handleLoadMoreMessage({chatroomId, isLoadMoreMessage, count} = {}, callback) {
        const createEntry = () => ({isLoadMoreMessage});
        try {
            const chatroom = await handleEvent(chatroomId, createEntry)
            const chatHistory = await chatroom.getChatHistory(chatroomId, 10 * count);
            callback(null, chatHistory.reverse());
        } catch (e) {
            callback()
        }
    }

    async function handleGetGroups({userId} = {}, callback) {
        console.log("handleGetGroups");
        const groups = await chatroomManager.getGroupsByUserID(userId);
        try {
            const onlineUsers = clientManager.getOnlineUsers();
            client.emit('onlineUser', {onlineUsers, groups})
        } catch (e) {
            callback()
        }
    }

    function handleDisconnect() {
        console.log("handleDisconnect " + client.id);
        // remove user profile
        clientManager.removeClient(client);
        // remove member from all chatrooms
        // chatroomManager.removeClient(client)
    }

    return {
        handleRegister,
        handleJoin,
        handleLeave,
        handleMessage,
        handleTyping,
        handleLoadMoreMessage,
        handleGetGroups,
        handleDisconnect
    }
};