import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

app.listen(3000, () => {
  console.log('Running server at http://localhost:3000');
});
