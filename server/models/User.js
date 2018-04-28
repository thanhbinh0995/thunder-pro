const Bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('ADMIN', 'NORMAL_USER'),
            defaultValue: 'NORMAL_USER',
        },
        birthday: {
            type: DataTypes.DATE(),
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
        },
        ageFilterMin: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        ageFilterMax: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        sex: {
            type: DataTypes.ENUM('MALE', 'FEMALE'),
            defaultValue: 'MALE',
            allowNull: true,
        },
        genderFilter: {
            type: DataTypes.ENUM('MALE', 'FEMALE', 'BOTH'),
            defaultValue: 'FEMALE',
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT(),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT(),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        aboutMe: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        career: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        classMethods: {
            associate: models =>  {
                User.hasMany(models.GroupUser, {foreignKey: 'userId'});
                User.hasMany(models.Like, {foreignKey: 'userId'});
                User.hasMany(models.Dislike, {foreignKey: 'userId'});
            },
            generateHash(password) {
                return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8), null);
            },
        },
        instanceMethods: {
            validatePassword: function (password) {
                console.log(password);
                if (Bcrypt.compareSync(password, this.password))
                    return true;
                else
                    return false;
            },
            toJSON: function () {
                let values = Object.assign({}, this.get());
                delete values.password;
                return values;
            },
        },
        hooks: {
            beforeCreate: function (user, options) {
                if (user.changed('password')) {
                    user.password = this.generateHash(user.password);
                }
            },
            beforeUpdate: function (user, options) {
                if (user.changed('password')) {
                    user.password = this.generateHash(user.password);
                }
            },
        },
        privateColumns: ['password'],
    });
    return User;

};