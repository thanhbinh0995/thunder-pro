'use strict';

const Group = require('../models').Group;
const User = require('../models').User;
const Message = require('../models').Message;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return User.findOne({
            where: {
                role: 'NORMAL_USER'
            }
        }).then(user => {
            return Group.findOne().then(group => {
                Message.create({
                    groupId: group.id,
                    userId: user.id,
                    message: 'Hello '
                })
            }).catch(function (err) {
                console.log(err)
            })
        }).catch(function (err) {
            console.log(err)
        })
    },

    down: (queryInterface, Sequelize) => {

    }
};
