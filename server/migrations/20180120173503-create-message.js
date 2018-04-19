'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Messages', {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {model: 'Users', key: 'id'}
            },
            groupId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {model: 'Groups', key: 'id'}
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING(100),
                defaultValue: 'text'
            },
            message: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Messages')
    }
};
