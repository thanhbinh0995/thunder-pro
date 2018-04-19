'use strict';

const User = require('../models').User;
const Group = require('../models').Group;

module.exports = {
    up: (queryInterface, Sequelize) => {
        console.log('add group');
        return User.findOne({
            where: {
                'role': 'NORMAL_USER'
            }
        }).then(function (user) {
            return Group.create({
                name: 'Group 3',
                userId: user.id
            }).then(group => {
                return true;
            }).catch(err => {
                return false;
            })
        }).catch(e => {
            return false;
        })
    },

    down: (queryInterface, Sequelize) => {
        // return Group.destroy({})
        //     .then(group => {
        //         return group;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }
};
