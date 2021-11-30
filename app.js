// Server 구현 js
// variable
const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const soketIO = require('socket.io');
const moment = require('moment');

const io = soketIO(server);

app.use(express.static(path.join(__dirname, 'src')));
const PORT = process.env.PORT || 5000;


io.on('connection', (socket) => {
    socket.on('chatting', (data) => {
        const { name, msg } = data;
        io.emit('chatting', {
            name,
            msg,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss A')
        }) 
    })
});


server.listen(PORT, ()=> console.log(`server is running ${PORT}`));