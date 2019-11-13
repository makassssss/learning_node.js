import app from './app';
import db from "./models";
import http from 'http';
import socket from 'socket.io';
import ChatService from './services/chatService';

const chatService = new ChatService();

const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
    socket.on('SEND_MESSAGE', message => {
        chatService.saveMessage(message);
        io.emit('RECEIVE_MESSAGE', message)
    });
});

server.listen(5000, () => {
    db.sequelize.sync();
});
