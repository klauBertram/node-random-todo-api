require('./config/config');

const express = require('express');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');

var app = express();

app.get('/', function(req, res){
  res.status(200).send('ok');
});

// POST Todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: 'play piano'
  });

  todo.save().then((todo) => {
    res.status(200).send({ todo });
  }, (err) => {
    res.status(400).send({});
  });
});

// GET Todos
app.get('/todos', (req, res) => {
});

// heroku sets process.env.PORT
app.listen(process.env.PORT, () => {
  console.log('********* express server started *********');
  console.log(`environment: ${process.env.NODE_ENV}`);
  console.log(`port: ${process.env.PORT}`);
});

module.exports = {
  app
};