import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app);
const webSocket = new WebSocket.Server({ server });

let sockets: WebSocket[] = [];

webSocket.on('connection', (socket) => {
  sockets = [...sockets, socket];

  console.log('Connected to Client 😃');

  socket.on('message', (message) => {
    sockets.forEach((socket) => socket.send(message));
  });

  socket.on('close', () => {
    console.log('Disconnected from Client 😥');
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
