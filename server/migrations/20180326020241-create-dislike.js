'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Dislikes', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {model: 'Users', key: 'id'}
            },
            friendId: {
                allowNull: false,
                type: Sequelize.UUID,
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
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Dislikes');
    }
};
