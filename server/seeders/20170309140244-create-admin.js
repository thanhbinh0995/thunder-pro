'use strict';

const User = require('../models').User;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return User
            .create({
                username: 'admin',
                email: 'admin@gmail.com',
                password: 'abc123',
                firstName: 'Peter',
                lastName: 'Lord',
                role: 'ADMIN',
                birthday: '06/09/1995',
                sex: "MALE",
                avatar: '66.png',
            })
            .then(user => {
                console.log(user);
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    down: (queryInterface, Sequelize) => {
        try {
            User.destroy({where: {'username': 'admin'}})
                .then(user => {
                    return user;
                })
                .catch(error => {
                    console.log(error);
                    return false;
                });
        } catch (e) {
            return false;
        }
    }
};
