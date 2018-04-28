'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
            },
            username: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            lastName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM('ADMIN', 'NORMAL_USER'),
                defaultValue: 'NORMAL_USER',
            },
            birthday: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            sex: {
                type: Sequelize.ENUM('MALE', 'FEMALE'),
                defaultValue: 'MALE',
                allowNull: true,
            },
            genderFilter: {
                type: Sequelize.ENUM('MALE', 'FEMALE', 'BOTH'),
                defaultValue: 'FEMALE',
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            ageFilterMin: {
                type: Sequelize.INTEGER,
                defaultValue: 23,
                allowNull: true,
            },
            ageFilterMax: {
                type: Sequelize.INTEGER,
                defaultValue: 33,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            career: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            avatar: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            latitude: {
                type: Sequelize.FLOAT(),
                allowNull: true,
            },
            longitude: {
                type: Sequelize.FLOAT(),
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            aboutMe: {
                type: Sequelize.STRING(256),
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};