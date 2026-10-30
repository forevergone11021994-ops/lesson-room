const express = require('express');
const http = require('http');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);

app.use('/peerjs', ExpressPeerServer(server, { path: '/', allow_discovery: false }));
app.get('/turn.json', (req, res) => {
  const urls = (process.env.TURN_URLS || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!urls.length) return res.json([]);
  res.set('Cache-Control', 'no-store');
  res.json([{ urls, username: process.env.TURN_USERNAME || '', credential: process.env.TURN_CREDENTIAL || '' }]);
});
app.get('/ping', (req, res) => res.send('ok'));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Lesson room on port ' + port));
