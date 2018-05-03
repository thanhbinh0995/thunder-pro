import HTTPStatus from "http-status";
import Response from "../../helpers/Response";
import {GroupRepository, GroupUserRepository, UserRepository} from "../../repositories";
import {GroupUser} from "../../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cache = require('../../helpers/cache');

let groupRepository = new GroupRepository();
let userRepository = new UserRepository();
let groupUserRepository = new GroupUserRepository();
class GroupController {

    index = async (req, res) => {
        cache.get("groups", async (err, groups) => {
            if (groups !== null) {
                console.log("get from cache");
                return Response.returnSuccess(res, groups);
            } else {
                try {
                    let groups = await groupRepository.find({
                        include: [{
                            model: GroupUser,
                            attributes: ['userId']
                        }]
                    });
                    cache.set("groups", JSON.stringify(groups), () => {
                        return Response.returnSuccess(res, groups);
                    });
                }
                catch (e) {
                    return Response.returnError(res, e, HTTPStatus.BAD_REQUEST);
                }
            }
        });
    };

    getGroupsByUser = async (req, res) => {
        let userIdRes = req.param('userId');
        // cache.get(`groups${userIdRes}`, async (err, groups) => {
        //     if (groups !== null) {
        //         console.log("get from cache");
        //         return Response.returnSuccess(res, groups);
        //     } else {
        try {
            let groups = await groupRepository.find({
                attributes: ['id', 'name', 'image', 'lastMessage', 'lastMessageTime'],
                include: [{
                    model: GroupUser,
                    attributes: ['userId'],
                    where: {
                        userId: userIdRes
                    },
                }],
                order: [
                    ['lastMessageTime', 'DESC'],
                ],
            });
            // cache.set("groups", JSON.stringify(groups), () => {
            return Response.returnSuccess(res, groups);
            // });
        }
        catch (e) {
            return Response.returnError(res, e, HTTPStatus.BAD_REQUEST);
        }
        // }
        // });
    };

    makeFriendWithUser = async (req, res) => {
        try {
            const userId = req.param('userId');
            const friendId = req.param('friendId');
            const user = await userRepository.find({
                where: {
                    id: userId
                }
            });
            const friend = await userRepository.find({
                where: {
                    id: friendId
                }
            });
            const data = {
                name: user[0].username + "-" + friend[0].username,
                nameId: user[0].id + "/" + friend[0].id,
                image: user[0].avatar + "/" + friend[0].avatar,
                lastMessage: "requested",
                lastMessageTime: new Date()
            };
            const group =  await groupRepository.create(data);

            const groupUserData = {
                groupId: group.id,
                userId: userId
            };
            const groupFriendData = {
                groupId: group.id,
                userId: friendId
            };
            const groupUser = await groupUserRepository.create(groupUserData);
            const groupFriend = await groupUserRepository.create(groupFriendData);
            cache.get(`users/${userId}`, async (err, users) => {
                if (users !== null) {
                    let usersParse = JSON.parse(users);
                    usersParse = usersParse.filter(user => user.id !== friendId);
                    cache.set(`users/${userId}`, JSON.stringify(usersParse), () => {
                        return Response.returnSuccess(res, groupUser);
                    });
                }
            });
        } catch (error) {
            return Response.returnError(res, error);
        }
    }
}

export default new GroupController();