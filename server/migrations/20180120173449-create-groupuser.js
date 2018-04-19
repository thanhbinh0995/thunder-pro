'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('GroupUsers', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV1
            },
            groupId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Groups', key: 'id'}
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'Users', key: 'id'}
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
        return queryInterface.dropTable('GroupUsers')
    }
};
