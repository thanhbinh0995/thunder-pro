'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Groups', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(100),
                defaultValue: 'No Name'
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING(100),
                defaultValue: 'No Name'
            },
            nameId: {
                allowNull: false,
                type: Sequelize.STRING(100),
                defaultValue: 'No Name'
            },
            lastMessage: {
                allowNull: true,
                type: Sequelize.STRING(100),
            },
            lastMessageTime: {
                type: Sequelize.DATE,
                allowNull: true
            },
            unreadMessage: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            avatar: {
                allowNull: true,
                type: Sequelize.STRING(100),
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Groups');
    }
};
