import AuthRepository from "../../repositories/AuthRepository";
import HTTPStatus from "http-status";
import Response from "../../helpers/Response";

const authRepository = new AuthRepository();

module.exports = {
    async login(req, res) {
        let data = req.body;
        try {
            let user = await authRepository.authenticate(data);
            return Response.returnSuccess(res, user);
        } catch (e) {
            return Response.returnError(res, e.message, HTTPStatus.BAD_REQUEST);
        }
    },
};
