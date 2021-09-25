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

webSocket.on('connection', (socket) => {
  console.log('Connected to Client 😃');

  socket.on('message', (message) => {
    console.log(`Client Message: ${message}`);
  });

  socket.on('close', () => {
    console.log('Disconnected from Client 😅');
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
