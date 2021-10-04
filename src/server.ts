import express from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use('/public', express.static(join(__dirname, 'public')));

app.get('/', (_, res) => res.render('index'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = createServer(app);
const io = new Server(httpServer);

interface ISocket extends Socket {
  nickname?: string;
}

io.on('connection', (socket: ISocket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on('enter', (nickname: string, roomName: string, callback) => {
    socket.nickname = nickname;
    socket.join(roomName);

    callback(roomName);

    socket.to(roomName).emit('welcome', nickname);
  });

  socket.on('message', (roomName: string, message: string, callback) => {
    socket.to(roomName).emit('message', `${socket.nickname}: ${message}`);

    callback(message);
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye', socket.nickname);
    });
  });
});

const port = 3000;

httpServer.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
