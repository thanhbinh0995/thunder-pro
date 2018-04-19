'use strict';
module.exports = (sequelize, DataTypes) => {
    const GroupUser = sequelize.define('GroupUser', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        groupId: {
            type: DataTypes.STRING,
            references: {model: 'Group', key: 'id'}
        },
        userId: {
            type: DataTypes.STRING,
            references: {model: 'User', key: 'id'}
        }
    }, {
        classMethods: {
            associate: function (models) {
                GroupUser.belongsTo(models.User, {foreignKey: 'userId'});
            }
        }
    });
    return GroupUser;
};