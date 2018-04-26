import config from "./server/config";
import Express from "express";
import BodyParser from "body-parser";
import Cors from "cors";
import fileUpload from "express-fileupload";
import Path from "path";
import {Web} from "./server/routes/index";
import Api from "./server/routes/api";
import Morgan from "morgan";
import SwaggerJSDoc from "swagger-jsdoc";
import io from "socket.io";
import ClientManager from "./server/controllers/chat/ClientManager";
import ChatroomManager from "./server/controllers/chat/ChatroomManager";
import makeHandlers from "./server/controllers/chat/handlers";
import webpush from "web-push";

const app = Express();

app.use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(fileUpload())
    .use(Express.static(Path.resolve(__dirname, 'client'), {maxAge: 31557600000}))
    .use(Express.static(Path.resolve(__dirname, 'server/public/uploads'), {maxAge: 31557600000}))
    .use('/api', Api)
    .use('/', Web);


if (process.env.NODE_ENV === 'development') {
    app.use(Morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
    const swaggerDefinition = {
        info: {
            title: 'Node Swagger API',
            version: '1.0.1',
            description: 'Demonstrating how to desribe a RESTful API with Swagger',
        },
        host: 'localhost:9000',
        basePath: '/',
    };

    const options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./server/controllers/api/*.js'],
    };


    // initialize swagger-jsdoc
    const swaggerSpec = SwaggerJSDoc(options);


    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

const server = app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`);
});


const ChatServer = io.listen(server);

const clientManager = new ClientManager();
const chatroomManager = new ChatroomManager();

ChatServer.on('connection', client => {
    const {
        handleRegister,
        handleJoin,
        handleLeave,
        handleMessage,
        handleTyping,
        handleLoadMoreMessage,
        handleGetGroups,
        handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager);
    console.log('client connected...', client.id);
    clientManager.addClient(client);

    client.on('register', handleRegister);

    client.on('join', handleJoin);

    client.on('leave', handleLeave);

    client.on('message', handleMessage);

    client.on('typing', handleTyping);

    client.on('loadMoreMessage', handleLoadMoreMessage);

    client.on('onlineUser', handleGetGroups);

    client.on('disconnect', function () {
        console.log('client disconnect...', client.id);
        handleDisconnect()
    });

    client.on('error', function (err) {
        console.log('received error from client:', client.id);
        console.log(err)
    })
});