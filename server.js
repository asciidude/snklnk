const express = require("express");
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

require('dotenv').config();
const ip = require('ip');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render(`${__dirname}/views/index`, { server: server, io: io });
});

/* [] = replace with descripted variable */
io.on('connect', client => {
    client.on('chat send', data => {
        /* send message: [user]: [message] */
        io.emit('chat send', data);
    });
});

io.on('disconnect', client => {
    /* send message: [user] has disconnected */
    console.log(`${client} disconnected from ${ip.address()}:${process.env.PORT || 8000}`);
});

server.listen(process.env.PORT || 25565, console.log(`Listening for connections on ${ip.address()}:${process.env.PORT || 8000}`));