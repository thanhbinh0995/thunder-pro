import {UserRepository} from "../../repositories";
let userRepository = new UserRepository();

export default class ClientManager {
    constructor() {
        this.clients = new Map();
        this.onlineClients = new Map();
    }

    getOnlineUsers() {
        const allUser = [...this.onlineClients.keys()];
        let onlineUser = [];
        for (const user of allUser) {
            if (this.onlineClients.get(user).length > 0) {
                onlineUser = [...onlineUser, user];
            }
        }
        return onlineUser;
    }

    addClient = async (client) => {
        console.log("client Id" + client.id);
        this.clients.set(client.id, {client})
    };

    registerClient = async (client, user) => {
        console.log("registerClient");
        this.clients.set(client.id, {client, user});
        console.log(this.onlineClients.get(user.id));
        this.onlineClients.get(user.id) ?
            this.onlineClients.set(user.id, [...this.onlineClients.get(user.id), client.id])
            :  this.onlineClients.set(user.id, [client.id]);
    };

    removeClient = async (client) => {
        const user = (this.clients.get(client.id) || {}).user;
        if (user && user.id) {
            const userOnline = this.onlineClients.get(user.id);
            const temp = userOnline.filter(a => {
                return a !== client.id
            });
            this.onlineClients.set(user.id, [...temp]);
        }
        this.clients.delete(client.id);
        client.emit('onlineUser', this.getOnlineUsers())
    };

    getUserById = async (userId) => {
        return await userRepository.findOne({
            where: {
                id: userId
            }, limit: 1
        });
    };

    getUserByClientId = (clientId) => {
        return (this.clients.get(clientId) || {}).user
    };
}
