require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');

const { mongoose } = require('./db/mongoose');
const TodoController = require('./controllers/TodoController');

const app = express();

// middleware to parse incoming response, json
app.use(bodyParser.json());

// middleware, error handling, this should be last 
app.use(function(err, req, res, next){
  res.status(400).send({});
});

app.use('/todos', TodoController);

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