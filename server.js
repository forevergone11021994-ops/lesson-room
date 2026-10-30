const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);

app.use('/peerjs', ExpressPeerServer(server, { path: '/', allow_discovery: false }));
app.get('/ping', (req, res) => res.send('ok'));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Lesson room on port ' + port));
