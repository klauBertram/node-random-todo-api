const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const { Todo } = require('../models/todo');

// router.use(bodyParser.json());

// GET Todos
router.get('/', (req, res) => {
  Todo.find({}).then((todos) => {
    res.status(201).send({ todos });
  }).catch((err) => {
    res.status(400).send({});
  });
});

// PATCH Todo
router.patch('/:id', (req, res) => {
  var id = req.params.id;
  // pick method will only pick the selected field and assign it to an object
  var body = _.pick(req.body, ['text', 'completed']);

  // check if id is valid before update
  if(!ObjectID.isValid(id)){
    return res.status(404).send({ message: 'ID not found' });
  }

  // if completed flag is true -> populate completed date
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }
  // completed flag is false -> set completed date to null
  else {
    body.completed = false;
    body.completedAt = null;
  }

  // save to db
  Todo.findOneAndUpdate({
    _id: id,
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if(!todo){
      return res.status(404).send({});
    }

    res.status(200).send({ todo });
  }).catch((err) => {
    res.status(400).send({});
  });
});

// POST Todo
router.post('/', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
    res.status(200).send({ todo });
  }).catch((err) => {
    res.status(400).send({});
  });
});

module.exports = router;