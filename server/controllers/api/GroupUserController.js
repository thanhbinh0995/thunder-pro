import HTTPStatus from "http-status";
import Response from "../../helpers/Response";
import {MessageRepository} from "../../repositories";
import {GroupUserRepository} from "../../repositories";
import {GroupUser, User, Group} from "../../models/index";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const groupUserRepository = new GroupUserRepository();
class GroupUserController {
    index = async (req, res) => {
        // let sex = req.param('sex');
        // console.log(sex);
        // cache.get("users", async (err, users) => {
        // if (users !== null) {
        //     console.log("get from cache");
        //     users = JSON.parse(users);
        //     return Response.returnSuccess(res, users);
        // } else {
        try {
            let groupUser = await groupUserRepository.find();
            // cache.set("users", JSON.stringify(users), () => {
            return Response.returnSuccess(res, groupUser);
            // });
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
        // }
        // });

    };


    create = async (req, res) => {
        try {
            let body = req.body;
            let user = await groupUserRepository.create(body);
            return Response.returnSuccess(res, user);
        } catch (e) {
            console.log(e);
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    };
}

export default new GroupUserController();