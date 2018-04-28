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
                avatar: 'default.jpg',
                role: 'NORMAL_USER',
                sex: "FEMALE",
                phone: '0120123434',
                aboutMe: 'My name is Kay Stephen',
                career: 'Student'
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
