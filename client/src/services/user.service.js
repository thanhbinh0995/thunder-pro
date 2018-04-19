import {authHeader} from "../helpers";
import axios from "axios";
const API_ROOT = '/api';

export const userService = {
    login,
    logout,
    register,
    getAll,
    update,
    requestFriend,
    delete: _delete,
    current,
    getGroupsByUser,
    getMessagesByGroup,
    loginFacebook,
    updateLocation,
    requestLikeFriend,
    uploadFile,
};

async function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
    };
    return await axios.post(`${API_ROOT}/users/register`, {
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
    }, requestOptions);
}

async function loginFacebook(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
    };
    const userChecked = await axios.get(`${API_ROOT}/users/check/${user.email}`);
    return userChecked ?
        userChecked
        : await axios.post(`${API_ROOT}/users/register`, {
            username: user.username,
            password: user.password,
            email: user.email,
            birthday: user.birthday,
        }, requestOptions);
}

async function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
    };
    return await axios.post(`${API_ROOT}/users/login`, {
        username: user.username,
        password: user.password
    }, requestOptions);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function current() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
    };
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        return await axios.get(`${API_ROOT}/users/${user.id}`, requestOptions);
    } else {
        return null;
    }
}

async function getGroupsByUser() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
    };
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        return await axios.get(`${API_ROOT}/groups/${user.id}`, requestOptions);
    } else {
        return null;
    }
}

async function getMessagesByGroup(groupId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
    };
    return await axios.get(`${API_ROOT}/message/${groupId}`, requestOptions);
}

async function getAll(offset) {
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader()},
    };
    return await axios.get(`${API_ROOT}/users/index?offset=${offset}&userId=${user.id}`, requestOptions);
}

async function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
    };

    return await axios.put(`${API_ROOT}/users/${user.id}`, {
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        address: user.address,
        ageFilterMin: user.ageFilterMin,
        ageFilterMax: user.ageFilterMax,
        sex: user.sex,
        genderFilter: user.genderFilter,
        avatar: user.avatar,
    }, requestOptions);
}


async function updateLocation(latitude, longitude) {
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
    };

    return await axios.put(`${API_ROOT}/users/${user.id}/location`, {
        latitude: latitude,
        longitude: longitude,
    }, requestOptions);
}



function requestFriend(friendId) {
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
    };
    return axios.get(`${API_ROOT}/groups/${user.id}/${friendId}`, requestOptions);
}

async function requestLikeFriend(friendId) {
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: {
            'friendId': friendId,
        }
    };
    return await axios.post(`${API_ROOT}/users/${user.id}/like`, requestOptions);
}

async function uploadFile(file) {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = new FormData();
    data.append('file', file);
    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': authHeader()
    //     },
    //     body: {
    //         data
    //     }
    // };
    return await axios.post(`${API_ROOT}/users/${user.id}/avatar`, data);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}