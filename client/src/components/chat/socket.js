import io from 'socket.io-client';

export default class Socket {
    constructor() {
        this.socket = io.connect('/')
        this.socket.on('error', function (err) {
            console.log('received socket error:');
            console.log(err)
        });
    }
    registerHandler = (onMessageReceived) => {
        this.socket.on('message', onMessageReceived);
        this.socket.on('typing', onMessageReceived);
    };

    getOnlineUsers = (onGetOnlineUsers) => {
        this.socket.on('onlineUser', onGetOnlineUsers);
    };

    unregisterHandler = () => {
        this.socket.off('message')
    };

    register = (userId, cb) => {
        this.socket.emit('register', userId, cb)
    };

    join = (chatroomId, cb) => {
        this.socket.emit('join', chatroomId, cb)
    };

    leave = (chatroomId, cb) => {
        this.socket.emit('leave', chatroomId, cb)
    };

    message = (userId, chatroomId, msg, cb) => {
        this.socket.emit('message', {userId, chatroomId, message: msg}, cb)
    };

    typing = (chatroomId, typing) => {
        this.socket.emit('typing', {chatroomId, typing})
    };

    loadMoreMessage = (chatroomId, isLoadMoreMessage, count, cb) => {
        this.socket.emit('loadMoreMessage', {chatroomId, isLoadMoreMessage, count}, cb)
    };

    getGroups = (userId, cb) => {
        this.socket.emit('onlineUser', {userId}, cb)
    };

    getAvailableUsers = (cb) => {
        this.socket.emit('availableUsers', null, cb)
    };
}

