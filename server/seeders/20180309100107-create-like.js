'use strict';

const User = require('../models').User;
const Like = require('../models').Like;

module.exports = {
    up: function (queryInterface, Sequelize) {
        return User.findOne({
            where: {
                'role': 'NORMAL_USER'
            }
        }).then(function (user) {
            return User.findOne({
                where: {
                    'id': {
                        $not: user.id
                    }
                }
            }).then(friend => {
                return Like.create({
                    userId: user.id,
                    friendId: friend.id
                }).then(like => {
                    return true;
                }).catch(err => {
                    return false;
                })
            });
        }).catch(e => {
            return false;
        })
    },

    down: function (queryInterface, Sequelize) {

    }
};
