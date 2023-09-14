"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const uuid_1 = require("uuid");
const ws_1 = __importDefault(require("ws"));
const handleChatMessage_1 = __importDefault(require("../controllers/api/socket/handleChatMessage"));
const handleIsActiveEvent_1 = __importDefault(require("../controllers/api/socket/handleIsActiveEvent"));
const handleIsTypingEvent_1 = __importDefault(require("../controllers/api/socket/handleIsTypingEvent"));
const utils_1 = require("../utils");
class ClientsStorage {
    constructor() {
        this.removeClient = (id) => delete this.storage[id];
        this.storeClient = (id, userId, ws) => (this.storage[id] = { ws, userId });
        this.getClient = (id) => this.storage[id];
        this.getClientsByUserIds = (userIds) => Array.isArray(userIds)
            ? Object.keys(this.storage).filter((clientId) => userIds.includes(this.storage[clientId].userId))
            : Object.keys(this.storage).filter((clientId) => this.storage[clientId].userId === userIds);
        this.storage = {};
    }
}
class SocketServer {
    constructor(server) {
        //all requests should have a header with token that has the senderId stored,
        //and this token needs to be decoded
        this.broadcastMessage = (recievers, msg) => {
            if (Array.isArray(recievers)) {
                recievers.forEach((reciever) => {
                    reciever.send(JSON.stringify(msg));
                });
            }
            else {
                recievers.send(JSON.stringify(msg));
            }
        };
        this.sendMessageToUsers = (userIds, msg) => {
            const clients = this.storage.getClientsByUserIds(userIds);
            console.log("clients", clients);
            this.broadcastMessage(clients
                .map((id) => this.storage.getClient(id).ws)
                .filter((socket) => socket), msg);
        };
        //TODO: parse token more secure, this is just bad code temporary, maybe not that bad but anyways
        this.verifyRequest = (req) => {
            const url = new URL("http://dummy" + req.url);
            const token = url.searchParams.get("auth");
            if (!token) {
                return;
            }
            const decoded = (0, utils_1.decodeToken)(token);
            if (!decoded) {
                return;
            }
            return decoded.id;
        };
        this.handleConnection = (clientId, userId, ws) => {
            this.storage.storeClient(clientId, userId, ws);
        };
        this.handleClose = (clientId) => {
            this.storage.removeClient(clientId);
        };
        this.handleMessage = (msg, clientId, userId) => {
            try {
                const { type, data } = JSON.parse(msg.toString());
                const client = this.storage.getClient(clientId);
                if (!client.ws) {
                    return;
                }
                const sender = client.ws;
                switch (type) {
                    case "message":
                        (0, handleChatMessage_1.default)({
                            sender,
                            senderId: userId,
                            data: data,
                        });
                        break;
                    case "typing":
                        (0, handleIsTypingEvent_1.default)({
                            sender,
                            senderId: userId,
                            data: data,
                        });
                        break;
                    case "isActive":
                        (0, handleIsActiveEvent_1.default)({
                            sender,
                            senderId: userId,
                            data: data,
                        });
                    case "ping":
                        return;
                    default:
                        break;
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        this.socket = new ws_1.default.Server({
            verifyClient: (info) => this.verifyRequest(info.req),
            server,
        });
        this.storage = new ClientsStorage();
        console.log("Socket is listening on", server);
        this.socket.on("connection", (ws, req) => {
            const userId = this.verifyRequest(req);
            if (!userId) {
                ws.close();
                return;
            }
            const clientId = (0, uuid_1.v4)();
            console.log("connection opened");
            this.handleConnection(clientId, userId, ws);
            ws.on("close", () => {
                console.log("connection close");
                this.handleClose(clientId);
            });
            ws.on("message", (msg) => {
                console.log(msg.toString());
                this.handleMessage(msg, clientId, userId);
            });
        });
    }
}
exports.SocketServer = SocketServer;
