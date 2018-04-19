const User = require('../models').User;
module.exports = {
    up: (queryInterface, Sequelize) => {
        return User
            .create({
                username: 'user',
                email: 'user@gmail.com',
                password: 'abc123',
                firstName: 'Kay',
                lastName: 'Stephen',
                birthday: '02/03/1995',
                avatar: '66.png',
                role: 'NORMAL_USER',
                sex: "FEMALE"
            })
            .then(user => {
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    down: (queryInterface, Sequelize) => {
        try {
            User.destroy({where: {'username': 'user'}})
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
