const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const config = require('./utils/config.js');
const middleware = require('./middleware/middleware.js');

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl);
  })
  .catch( error => {
    console.log(error);
  });

const sendIndex = (req, res) => res.sendFile(path.join(path.join(__dirname, 'public'), 'index.html'));

app.use(cors());
app.get('/blogs', (req, res) => sendIndex(req, res));
app.get('/blogs/:id', (req, res) => sendIndex(req, res));
app.get('/users', (req, res) => sendIndex(req, res));
app.get('/users/:id', (req, res) => sendIndex(req, res));
app.get('/login', (req, res) => sendIndex(req, res));
app.use(express.static('public'));
app.use(middleware.tokenExtractor);
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = {
  app,
  server
};
