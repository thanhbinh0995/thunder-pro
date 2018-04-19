import {userConstants} from "../constants";
import {userService} from "../services";
import {alertActions} from "./";
import {history} from "../helpers/history";

export const userActions = {
    login,
    logout,
    register,
    save,
    getCurrentUser,
    getAll,
    requestFriend,
    loginFacebook,
    updateLocation,
    requestLikeFriend,
    uploadFile,
};
function login(user) {
    return dispatch => {
        dispatch(request({user}));
        userService.login(user)
            .then(data => {
                dispatch(loginSuccess(data));
                localStorage.setItem('user', JSON.stringify(data.data.data));
                history.push('/');
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data));
                dispatch(alertActions.error("Username or password is not correct"));
            });
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function loginSuccess(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function loginFailure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    history.push('/login');
    return {type: userConstants.LOGOUT};
}


function loginFacebook(user) {
    return dispatch => {
        dispatch(request({user}));
        userService.loginFacebook(user)
            .then(data => {
                const user = {
                    username: data.data.data.username,
                    password: data.data.data.password ? data.data.data.password : '',
                };
                userService.login(user)
                    .then(data => {
                        dispatch(success(data));
                        localStorage.setItem('user', JSON.stringify(data.data.data));
                        history.push('/');
                    })
                    .catch(error => {
                        dispatch(loginFailure(error.response.data));
                        dispatch(alertActions.error("Username or password is not correct"));
                    });
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.errors));
                dispatch(alertActions.error(JSON.stringify(error.response.data.errors)));
            });
    };

    function request(user) {
        return {type: userConstants.LOGIN_FACEBOOK_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_FACEBOOK_SUCCESS, user}
    }

    function loginFailure(error) {
        return {type: userConstants.LOGIN_FACEBOOK_FAILURE, error}
    }
}

function register(user) {
    return dispatch => {
        dispatch(request({user}));
        userService.register(user)
            .then(user => {
                dispatch(success(user));
                history.push('/login');
                dispatch(alertActions.success('Registration successful'));
            })
            .catch(error => {
                dispatch(failure(error.response.data.errors));
                dispatch(alertActions.error(JSON.stringify(error.response.data.errors)));
            });
    };

    function request(user) {
        return {type: userConstants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

export function save(user) {
    return dispatch => {
        dispatch(request({user}));
        userService.update(user)
            .then(user => {
                dispatch(success(user));
                history.push('/');
                dispatch(alertActions.success('Update Profile Successful'));
            })
            .catch(error => {
                dispatch(failure(error.response.data.errors));
                dispatch(alertActions.error(JSON.stringify(error.response.data.errors)));
            });
    };

    function request(user) {
        return {type: userConstants.UPDATE_USER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.UPDATE_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.UPDATE_USER_FAILURE, error}
    }
}

export function getCurrentUser() {
    return dispatch => {
        if (userService.current()) {
            userService.current()
                .then(request => {
                    dispatch(success(request.data.data));
                })
                .catch(error => {
                    dispatch(failure("Cannot get Current User"));
                });
        }
    };

    function success(user) {
        return {type: userConstants.GET_CURRENT_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.GET_CURRENT_USER_FAILURE, error}
    }
}


export function getAll(offset = 1) {
    return dispatch => {
        dispatch(request());
        userService.getAll(offset)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}


export function requestFriend(friendId) {
    return dispatch => {
        dispatch(request());
        userService.requestFriend(friendId)
            .then(request => {
                dispatch(success(request.data.data));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    };

    function request() {
        return {type: userConstants.REQUEST_FRIEND}
    }

    function success(group) {
        return {type: userConstants.REQUEST_FRIEND_SUCCESS, group}
    }

    function failure(error) {
        return {type: userConstants.REQUEST_FRIEND_FAILURE, error}
    }
}

export function updateLocation(latitude, longitude) {
    return dispatch => {
        dispatch(request(latitude, longitude));
        userService.updateLocation(latitude, longitude)
            .then(user => {
                dispatch(success(user));
            })
            .catch(error => {
                dispatch(failure(error.response.data.errors));
            });
    };

    function request(latitude, longitude) {
        return {type: userConstants.UPDATE_LOCATION}
    }

    function success(user) {
        return {type: userConstants.UPDATE_LOCATION_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.UPDATE_LOCATION_FAILURE, error}
    }
}

export function requestLikeFriend(friendId) {
    return dispatch => {
        userService.requestLikeFriend(friendId)
            .then(like => {
                dispatch(success(like));
            })
            .catch(error => {
                dispatch(failure(error.response.data.errors));
            });
    };

    function success(like) {
        return {type: userConstants.REQUEST_LIKE_FRIEND_SUCCESS, like}
    }

    function failure(error) {
        return {type: userConstants.REQUEST_LIKE_FRIEND_FAILURE, error}
    }
}

export function uploadFile(file) {
    return dispatch => {
        dispatch(request());
        userService.uploadFile(file)
            .then(res => {
                dispatch(success(res));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    };

    function request() {
        return {type: userConstants.REQUEST_UPLOAD_FILE}
    }

    function success(res) {
        return {type: userConstants.REQUEST_UPLOAD_FILE_SUCCESS, res}
    }

    function failure(error) {
        return {type: userConstants.REQUEST_UPLOAD_FILE_FAILURE, error}
    }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: userConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: userConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: userConstants.DELETE_FAILURE, id, error}
    }
}

