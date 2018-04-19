import {chatConstants} from "../constants";

export default function chatReducer(state = [], action) {
    switch (action.type) {
        case chatConstants.GET_GROUP_BY_USER_SUCCESS:
            return action.groups.data;
        case chatConstants.GET_GROUP_BY_USER_FAILURE:
            return {};
        case chatConstants.GET_MESSAGE_BY_GROUP_SUCCESS:
            return {};
        case chatConstants.GET_MESSAGE_BY_GROUP_FAILURE:
            return {};
        default:
            return state;
    }
}

