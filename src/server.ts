import express from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use('/public', express.static(join(__dirname, 'public')));

app.get('/', (_, res) => res.render('index'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(io, { auth: false });

const getRooms = () => {
  const { rooms, sids } = io.sockets.adapter;

  return [...rooms.keys()].reduce((rooms: string[], room) => {
    return sids.get(room) ? rooms : [...rooms, room];
  }, []);
};

const counter = (roomName: string) => {
  return io.sockets.adapter.rooms.get(roomName)?.size ?? 0;
};

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

    callback(roomName, counter(roomName));

    socket.to(roomName).emit('welcome', nickname, roomName, counter(roomName));

    io.sockets.emit('rooms', getRooms());
  });

  socket.on('message', (roomName: string, message: string, callback) => {
    socket.to(roomName).emit('message', `${socket.nickname}: ${message}`);

    callback(message);
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((roomName) => {
      socket
        .to(roomName)
        .emit('leave', socket.nickname, roomName, counter(roomName) - 1);
    });
  });

  socket.on('disconnect', () => {
    io.sockets.emit('rooms', getRooms());
  });
});

const port = 3000;

httpServer.listen(port, () => {
  console.log(`Running http server at http://localhost:${port}`);
  console.log('Running instrument at https://admin.socket.io');
});
