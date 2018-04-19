import Chatroom from "./Chatroom";
import {GroupRepository, GroupUserRepository} from "../../repositories";
import {GroupUser} from "../../models/index";
let groupRepository = new GroupRepository();
let groupUserRepository = new GroupUserRepository();

export default class ChatroomManager {
    constructor() {
        this.chatrooms = new Map();
    }

    registerChatrooms = async (client, groups) => {
        groups.map(group => {
            if (!this.chatrooms.has(group.id))
                this.chatrooms.set(group.id, Chatroom(group))
        });
    };

    getChatroomByName = async (chatroomId) => {
        return this.chatrooms.get(chatroomId)
    };

    getGroupsByUserID = async (userId) => {
        return await groupRepository.find({
            attributes: ['id', 'name', 'nameId', 'lastMessage', 'lastMessageTime'],
            include: [{
                model: GroupUser,
                attributes: ['userId'],
                where: {
                    userId: userId
                },
            }],
            order: [
                ['lastMessageTime', 'DESC'],
            ],
        })
    }

    getUsersByGroupId = async (groupId) => {
        return await groupUserRepository.find({
            attributes: ['userId'],
            where: {
                groupId: groupId
            }
        })
    }
}