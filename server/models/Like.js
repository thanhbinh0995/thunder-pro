'use strict';
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {model: 'User', key: 'id'}
        },
        friendId: {
            type: DataTypes.UUID,
            references: {model: 'User', key: 'id'}
        }
    }, {
        classMethods: {
            associate: models =>  {
                Like.belongsTo(models.User, {foreignKey: 'userId'});
            }
        }
    });
    return Like;
};