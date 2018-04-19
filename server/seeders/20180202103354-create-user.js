const User = require('../models').User;
const Faker = require('faker');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return User
            .create({
                username: Faker.name.findName(),
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: Faker.internet.email(),
                password: 'abc123',
                role: 'NORMAL_USER',
                sex: Faker.random.arrayElement(["MALE", "FEMALE"]),
                avatar: '66.png'
            })
            .then(user => {
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    down: function (queryInterface, Sequelize) {
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
