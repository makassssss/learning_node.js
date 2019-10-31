import app from './app';
import db from "./models";
import http from 'http';
import socket from 'socket.io';

const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
    socket.on('SEND_MESSAGE', message => {
        io.emit('RECEIVE_MESSAGE', message)
    });
});

server.listen(5000, () => {
    db.sequelize.sync();
});
