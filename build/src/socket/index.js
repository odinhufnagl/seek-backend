"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const handleChatMessage_1 = __importDefault(require("../controllers/api/socket/handleChatMessage"));
const handleIsActiveEvent_1 = __importDefault(require("../controllers/api/socket/handleIsActiveEvent"));
const handleIsTypingEvent_1 = __importDefault(require("../controllers/api/socket/handleIsTypingEvent"));
const utils_1 = require("../utils");
class ClientsStorage {
    constructor() {
        this.removeClient = (id) => delete this.storage[id];
        this.storeClient = (id, ws) => (this.storage[id] = ws);
        this.getClient = (id) => this.storage[id];
        this.storage = [];
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
            if (Array.isArray(userIds)) {
                this.broadcastMessage(userIds
                    .map((id) => this.storage.getClient(id))
                    .filter((socket) => socket), msg);
            }
            else {
                if (this.storage.getClient(userIds)) {
                    console.log("info", this.storage.getClient(userIds), msg);
                    this.broadcastMessage(this.storage.getClient(userIds), msg);
                }
            }
        };
        //TODO: parse token more secure, this is just bad code temporary
        //TODO: bad bad auth here, take a look into this, because right now awful with substring(6) and so on
        this.verifyRequest = (req) => {
            console.log(req.url.substring(6));
            const token = req.url.substring(6);
            if (!token) {
                return;
            }
            const decoded = (0, utils_1.decodeToken)(token);
            if (!decoded) {
                return;
            }
            return decoded.id;
        };
        this.handleConnection = (userId, ws) => {
            this.storage.storeClient(userId, ws);
            //set user is active in db
            //then get all users that user has chat with
            //then getClients that takes in a list of ids and returns a list of clients
            //then send message to all the clients
        };
        this.handleClose = (userId) => {
            this.storage.removeClient(userId);
            //set user is not active in db
            //then get all users that user has chat with
            //then getClients that takes in a list of ids and returns a list of clients
            //then send message to all the clients
        };
        this.handleMessage = (msg, userId) => {
            try {
                const { type, data } = JSON.parse(msg.toString());
                const sender = this.storage.getClient(userId);
                if (!sender) {
                    return;
                }
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
            console.log("connection opened");
            this.handleConnection(userId, ws);
            ws.on("close", () => {
                console.log("connection close");
                this.handleClose(userId);
            });
            ws.on("message", (msg) => {
                console.log(msg.toString());
                this.handleMessage(msg, userId);
            });
        });
    }
}
exports.SocketServer = SocketServer;
