require('./config/config');

const express = require('express');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');

var app = express();

app.get('/', function(req, res){
  res.status(200).send('ok');
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