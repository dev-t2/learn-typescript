import express from 'express';
import { join } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use('/public', express.static(join(__dirname, 'public')));

app.get('/', (_, res) => res.render('index'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on('enter', (room: string, callback) => {
    socket.join(room);

    callback(room);

    socket.to(room).emit('welcome');
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye');
    });
  });

  socket.on('message', (room: string, message: string, callback) => {
    socket.to(room).emit('message', message);

    callback(message);
  });
});

const port = 3000;

httpServer.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
