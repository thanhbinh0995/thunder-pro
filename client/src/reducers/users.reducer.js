import {userConstants} from "../constants";

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.UPDATE_USER_REQUEST:
            return {};
        case userConstants.UPDATE_USER_SUCCESS:
            return {...state};
        case userConstants.UPDATE_USER_FAILURE:
            return {...state};
        case userConstants.UPDATE_LOCATION:
            return {};
        case userConstants.UPDATE_LOCATION_SUCCESS:
            return {...state};
        case userConstants.UPDATE_LOCATION_FAILURE:
            return {...state};
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case userConstants.REQUEST_FRIEND:
            return {
                ...state,
                loading: true
            };
        case userConstants.REQUEST_FRIEND_SUCCESS:
            return {
                ...state,
                groupUser: action.group
            };
        case userConstants.REQUEST_FRIEND_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case userConstants.REQUEST_LIKE_FRIEND:
            return {
                ...state,
                loading: true
            };
        case userConstants.REQUEST_LIKE_FRIEND_SUCCESS:
            return {
                ...state,
                like: action.like
            };
        case userConstants.REQUEST_LIKE_FRIEND_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case userConstants.REQUEST_UPLOAD_FILE:
            return {
                ...state,
                loading: true
            };
        case userConstants.REQUEST_UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                res: action.res.data.data
            };
        case userConstants.REQUEST_UPLOAD_FILE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? {...user, deleting: true}
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const {deleting, ...userCopy} = user;
                        // return copy of user with 'deleteError:[error]' property
                        return {...userCopy, deleteError: action.error};
                    }

                    return user;
                })
            };
        default:
            return state
    }
}