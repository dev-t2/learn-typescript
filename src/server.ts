import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => res.render('index'));
app.get('/*', (_, res) => res.redirect('/'));

const server = http.createServer(app);
const webSocket = new WebSocket.Server({ server });

interface ISocket extends WebSocket {
  nickname?: string;
}

let sockets: ISocket[] = [];

webSocket.on('connection', (socket: ISocket) => {
  sockets = [...sockets, socket];

  console.log('Connected to Client 😃');

  socket.on('message', (data) => {
    const { type, payload } = JSON.parse(data.toString());

    if (type === 'nickname') {
      socket.nickname = payload;
    }

    if (type === 'message') {
      const nickname = socket.nickname ?? '익명 사용자';

      sockets.forEach((socket) => {
        socket.send(`${nickname}: ${payload}`);
      });
    }
  });

  socket.on('close', () => {
    console.log('Disconnected from Client 😥');
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
