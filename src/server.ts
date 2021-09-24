import express from 'express';
import path from 'path';
import http from 'http';
import WebSocket from 'ws';

const PORT = 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

server.listen(PORT, () => {
  console.log(`Running server at http://localhost:${PORT}`);
});
