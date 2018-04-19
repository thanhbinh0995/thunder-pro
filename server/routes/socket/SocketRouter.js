import {SocketController} from '../../controllers/chat';

export default class SocketRouter {
    send = (server, socket, data) => {
        return SocketController.addMessage(server,socket,data);
    }
}