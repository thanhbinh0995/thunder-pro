import {Group, User} from "../../models/index";
import {GroupRepository, MessageRepository} from "../../repositories";
import makeHandleEvent from "./handlers";
import ClientManager from "./ClientManager";
import ChatroomManager from "./ChatroomManager";
const groupRepository = new GroupRepository();
const messageRepository = new MessageRepository();

const clientManager = new ClientManager();
const chatroomManager = new ChatroomManager();

export default class SocketController {
    constructor(client) {
        this.client = client;
        this.clientManager = clientManager;
        this.chatroomManager = chatroomManager;
        this.handleEvent = makeHandleEvent(client, clientManager, chatroomManager);
    }

    handleRegister = async (userId) => {
        const user = await this.clientManager.getUserById(userId);
        this.clientManager.registerClient(this.client, user);
        const groups = await this.chatroomManager.getGroupsByUserID(userId);
        this.chatroomManager.registerChatrooms(this.client, groups);
        return user
    };

    handleJoin = async (chatroomId, callback) => {
        const createEntry = () => ({event: `joined ${chatroomId}`});
        try {
            const chatroom = await this.handleEvent(chatroomId, createEntry);
            chatroom.addUser(client);
            const chatHistory = await chatroom.getChatHistory(chatroomId);
            callback(null, chatHistory.reverse());
        } catch (e) {
            callback()
        }
    };

    handleLeave = async (chatroomId, callback) => {
        const createEntry = () => ({event: `left ${chatroomId}`});

        this.handleEvent(chatroomId, createEntry)
            .then(function (chatroom) {
                // remove member from chatroom
                chatroom.removeUser(this.client.id);

                callback(null)
            })
            .catch(callback)
    };

    handleMessage = async ({chatroomId, message} = {}, callback) => {
        const createEntry = () => ({message});
        this.handleEvent(chatroomId, createEntry)
            .then(() => callback(null))
            .catch(callback)
    };

    handleTyping = async ({chatroomId, typing} = {}) => {
        const createEntry = () => ({typing});

        this.handleEvent(chatroomId, createEntry)
    };

    handleLoadMoreMessage = async ({chatroomId, isLoadMoreMessage, count} = {}, callback) => {
        const createEntry = () => ({isLoadMoreMessage});
        this.handleEvent(chatroomId, createEntry)
            .then(async function (chatroom) {
                const chatHistory = await new Promise((resolve, reject) => {
                    const res = chatroom.getChatHistory(chatroomId, 10 * count);
                    return res
                        ? resolve(res)
                        : reject("error something")
                });

                callback(null, chatHistory.reverse());
            })
    };

    handleGetChatrooms = async (userId, callback) => {
        const chatrooms = await this.chatroomManager.getGroupsByUserID(userId);
        return callback(null, chatrooms)
    };

    handleDisconnect = async () => {
        console.log("handleDisconnect " + this.client.id);
        // remove user profile
        clientManager.removeClient(client);
        // remove member from all chatrooms
        // chatroomManager.removeClient(client)
    }
}