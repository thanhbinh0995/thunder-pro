import DotENV from "dotenv";
import DBConfig from "../config/db-config.json";
import Whitelist from './whitelist.json';

DotENV.config();
const db = DBConfig[process.env.NODE_ENV];

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    expireTime: process.env.EXPIRE_TIME,
    db: {
        username: db.username,
        password: db.password,
        database: db.database,
        host: db.port,
        dialect: db.dialect
    },
    facebookAPI: {
        clientID: '140144999985644',
        clientSecret: '4394f5f9559c6c3bcf6823852acd2bfd',
        callbackURL: 'http://localhost:9000/api/auth/facebook/callback',
        profileFields: ['id', 'name', 'email', 'education', 'about', 'birthday', 'gender', 'photos', 'displayName', 'events', 'profileUrl', 'location'],
    },
    whitelist: Whitelist
};