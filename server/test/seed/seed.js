const { ObjectID } = require('mongodb');

const { Todo } = require('../../models/todo');

const TODOS = [{
  _id: new ObjectID(),
  text: 'go to sleep'
}, {
  _id: new ObjectID(),
  text: 'take a shower'
}];

const populateTodos = (done) => {
  // remove all todos then re-add items
  Todo.remove({}).then(() => {
    return Todo.insertMany(TODOS).then(() => done());
  });
}

module.exports = {
  populateTodos
}