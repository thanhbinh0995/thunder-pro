import HTTPStatus from "http-status";
import Response from "../../helpers/Response";
import {LikeRepository, UserRepository} from "../../repositories";
import {GroupUser, User} from "../../models";
import getSameScore from "../../utils/recommendation";
import _ from "lodash";
const Sequelize = require('sequelize');
const DB = require('../../config/db-config.json');
const connection = DB['development'];
let sequelize = new Sequelize(connection.database, connection.username, connection.password, connection);
const Op = Sequelize.Op;

let userRepository = new UserRepository();
let likeRepository = new LikeRepository();
const cache = require('../../helpers/cache');
import uuidv4 from "uuid/v4";

class UserController {
    index = async (req, res) => {
        let offset = req.param('offset');
        let userId = req.param('userId');

        // cache.get(`users/${userId}`, async (err, users) => {
        //     if (users !== null) {
        //         users = JSON.parse(users);
        //         return Response.returnSuccess(res, users);
        //     } else {
        try {
            const user = await userRepository.findOne({
                where: {
                    id: userId
                }
            });
            const latitude = user.latitude;
            const longitude = user.longitude;
            let sql_q = 'SELECT *, 2 * 6371 * asin(sqrt((sin(radians(("Users".latitude - ' + latitude + ') / 2))) ^ 2 + cos(radians(' + latitude + ')) * cos(radians("Users".latitude)) * (sin(radians(("Users".longitude - ' + longitude + ') / 2))) ^ 2)) as distance from "Users" WHERE "Users"."id" NOT IN (' +
                'SELECT "GroupUsers"."userId" FROM "GroupUsers" WHERE "GroupUsers"."groupId" IN (' +
                'SELECT "GroupUsers"."groupId" FROM "GroupUsers" WHERE "GroupUsers"."userId"=$1)) LIMIT 10 OFFSET ' + offset * 10;
            sequelize.query(sql_q, {bind: [userId], type: sequelize.QueryTypes.SELECT})
                .then(values => {
                    cache.set(`users/${userId}`, JSON.stringify(values), () => {
                        return Response.returnSuccess(res, values);
                    });
                })
                .catch(e => {
                    console.log(e)
                });
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
        // }
        // });
    };

    create = async (req, res) => {
        try {
            let body = req.body;
            let user = await userRepository.create(body);
            return Response.returnSuccess(res, user);
        } catch (e) {
            console.log(e);
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };

    // create = async (req, res) => {
    //     try {
    //         let body = req.body;
    //         let user = await userRepository.create(body);
    //         cache.get("users", async (err, users) => {
    //             if (users !== null) {
    //                 let usersParse = JSON.parse(users);
    //                 usersParse = [...usersParse, user];
    //                 cache.set("users", JSON.stringify(usersParse), () => {
    //                     return Response.returnSuccess(res, user);
    //                 });
    //             }
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
    //     }
    // };

    view = async (req, res) => {
        let userId = req.param('id');
        try {
            let user = await userRepository.findOne({
                where: {id: userId},
            });
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };

    update = async (req, res) => {
        try {
            let userId = req.param('id');
            const options = {
                where: {
                    id: userId
                }
            };
            let body = req.body;
            let user = await userRepository.update(body, options);
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };

    delete = async (req, res) => {
        try {
            let userId = req.param('id');
            let user = await userRepository.delete(userId);
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    }

    checkEmailExist = async (req, res) => {
        console.log("check email if exist");
        let email = req.param('email');
        try {
            let user = await userRepository.findOne({
                where: {email: email},
            });
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    }

    requestLikeFriend = async (req, res) => {
        console.log("request like new friend");
        const userId = req.param('id');
        const friendId = req.body.body.friendId;
        console.log(req.body.body.friendId);
        try {
            let like = await likeRepository.create({userId, friendId});
            return Response.returnSuccess(res, like);
        } catch (e) {
            console.log(e);
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    }

    updateLocation = async (req, res) => {
        try {
            let userId = req.param('id');
            const options = {
                where: {
                    id: userId
                }
            };
            let body = req.body;
            let user = await userRepository.update(body, options);
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };

    suggestFriend = async (req, res) => {
        let currentUserId = req.param('id');
        console.log("suggest friend");
        try {
            const currentUserLike = await likeRepository.find({
                attributes: ['friendId'],
                where: {
                    userId: currentUserId,
                }
            });
            const friendIds = _.map(currentUserLike, 'friendId');
            let others = await userRepository.find({
                where: {
                    $not: {
                        id: currentUserId
                    }
                },
                limit: 20,
            });
            let sorted;
            for (let user of others) {
                const userLike = await likeRepository.find({
                    attributes: ['friendId'],
                    where: {
                        userId: user.id
                    }
                });
                const friendUserIds = _.map(userLike, 'friendId');
                user.score = getSameScore(friendIds, friendUserIds);
                if (!user.suggestScore) {
                    user.suggestScore = 0;
                }

                if (user.score > 0.2) {
                    let listSuggest = _.difference(friendUserIds, friendIds);
                    for (let friendId of listSuggest) {
                        if (friendId !== currentUserId && friendIds.indexOf(friendId) < 0) {
                            const index = others.findIndex(e => e.id === friendId);
                            if (others[index].suggestScore) {
                                others[index].suggestScore += user.score;
                            } else {
                                others[index].suggestScore = user.score;
                            }
                        }
                    }

                }
            }

            sorted = _.sortBy(others, ['suggestScore', 'score']);
            sorted = _.reverse(sorted);
            sorted = _.reject(sorted, user => {
                return ((user.suggestScore === 0 && user.score === 0)) || friendIds.indexOf(user.id) >= 0;
            });
            return res.json(sorted);

        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };

    uploadAvatar = async (req, res) => {
        const userId = req.param('id');
        const file = req.files.file;
        const data = {
            avatar: uuidv4() + ".png"
        };
        try {
            let uploaded = true;
            file.mv(`server/public/uploads/${data.avatar}`, function(err) {
                if (err) {
                    uploaded = false;
                    return res.status(500).send(err);
                }
            });
            const options = {
                where: {
                    id: userId
                }
            };
            let user = await userRepository.update(data, options);
            return Response.returnSuccess(res, {
                message: 'Upload avatar completed',
                fileName: data.avatar,
            });
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };
}

export default new UserController();