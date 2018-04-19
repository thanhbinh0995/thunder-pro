'use strict';
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {model: 'User', key: 'id'}
        },
        groupId: {
            type: DataTypes.UUID,
            references: {model: 'Group', key: 'id'}
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Message.belongsTo(models.User, {foreignKey: 'userId'});
                // Message.belongsTo(models.Group, {foreignKey: 'groupId'});
            }
        }
    });
    return Message;
};