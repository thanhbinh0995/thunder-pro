import HTTPStatus from "http-status";
import Response from "../../helpers/Response";
import {MessageRepository} from "../../repositories";
import {GroupUserRepository} from "../../repositories";
import {GroupUser, User, Group} from "../../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cache = require('../../helpers/cache');


const messageRepository = new MessageRepository();
const groupUserRepository = new GroupUserRepository();
class ChatController {
    index = async (req, res) => {
        cache.get("messages", async (err, messages) => {
            if (messages !== null) {
                console.log("get from cache");
                return Response.returnSuccess(res, messages);
            } else {
                try {
                    let messages = await messageRepository.find({
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'role'],
                            }
                        ],
                    });
                    cache.set("messages", JSON.stringify(messages), () => {
                        return Response.returnSuccess(res, messages);
                    });
                }
                catch (e) {
                    return Response.returnError(res, e, HTTPStatus.BAD_REQUEST);
                }
            }
        });
    };

    createMessage = async (req, res) => {
        const groupId = req.param('groupId');
        const userId = req.param('userId')
        const data = {
            userId: userId,
            groupId: groupId,
        };
        const groupUser = groupUserRepository.create(data)
    };

    getMessagesByGroup = async (req, res) => {
        let groupIdRes = req.param('groupId');

        cache.get(`messages${groupIdRes}`, async (err, messages) => {
            if (messages !== null) {
                console.log("get from cache");
                return Response.returnSuccess(res, messages);
            } else {
                try {
                    let messages = await messageRepository.find({
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'role'],
                            },
                        ],
                        where: {
                            groupId: groupIdRes
                        }
                    });
                    cache.set(`messages${groupIdRes}`, JSON.stringify(messages), () => {
                        return Response.returnSuccess(res, messages);
                    });
                }
                catch (e) {
                    return Response.returnError(res, e, HTTPStatus.BAD_REQUEST);
                }
            }
        });
    }
}

export default new ChatController();