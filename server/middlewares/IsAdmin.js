import HTTPStatus from "http-status";
import Response from "../helpers/Response";

export default class IsAdmin {
    index = async (req, res, next) => {
        if (req.user.role === 'ADMIN') {
            next();
        } else {
            return Response.returnError(HTTPStatus[HTTPStatus.UNAUTHORIZED], HTTPStatus.UNAUTHORIZED);
        }
    }
}