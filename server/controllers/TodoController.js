const _ = require('lodash');
const { ObjectID } = require('mongodb');
const router = require('express').Router();

const { Todo } = require('../models/todo');

// DELETE Todos
router.delete('/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.status(200).send({ todo });
  }).catch((err) => {
    res.status(400).send();
  });
});

// GET Todos
router.get('/', (req, res) => {
  Todo.find({}).sort({ rank: 1 }).then((todos) => {
    res.status(200).send({ todos });
  }).catch((err) => {
    res.status(400).send();
  });
});

// PATCH Todo
router.patch('/:id', (req, res) => {
  let id = req.params.id;
  // pick method will only pick the selected field and assign it to an object
  let body = _.pick(req.body, ['text', 'completed']);

  // check if id is valid before update
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  // if completed flag is true -> populate completed date
  if((_.isBoolean(body.completed) || body.completed === 'true') && body.completed){
    body.completedAt = new Date().getTime();
  }
  // completed flag is false -> set completed date to null
  else {
    body.completed = false;
    body.completedAt = null;
  }

  // save to db
  // new: true, returns the newly update object
  Todo.findOneAndUpdate({
    _id: id,
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({ todo });
  }).catch((err) => {
    res.status(400).send();
  });
});

// POST Todo
router.post('/', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
    res.status(201).send({ todo });
  }).catch((err) => {
    res.status(400).send({});
  });
});

module.exports = router;