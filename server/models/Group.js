'use strict';
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        image: {
            allowNull: true,
            type: DataTypes.STRING
        },
        nameId: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastMessage: {
            allowNull: true,
            type: DataTypes.STRING
        },
        lastMessageTime: {
            allowNull: true,
            type: DataTypes.DATE
        },
        unreadMessage: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
    }, {
        classMethods: {
            associate: models =>  {
                Group.hasMany(models.GroupUser, {foreignKey: 'groupId'});
                Group.hasMany(models.Message, {foreignKey: 'groupId'});
            }
        }
    });
    return Group;
};