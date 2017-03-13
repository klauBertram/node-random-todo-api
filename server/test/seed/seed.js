const { ObjectID } = require('mongodb');

const { Todo } = require('../../models/todo');

const TODOS = [{
  _id: new ObjectID(),
  text: 'go to sleep',
  rank: 1
}, {
  _id: new ObjectID(),
  completed: true,
  complatedAt: '1489288556983',
  rank: 2,
  text: 'take a shower'
}, {
  _id: new ObjectID(),
  text: 'buy egg'
}, {
  _id: new ObjectID(),
  text: 'buy milk'
}];

const populateTodos = (done) => {
  // remove all todos then re-add items
  Todo.remove({}).then(() => {
    return Todo.insertMany(TODOS).then(() => done());
  });
}

module.exports = {
  populateTodos,
  TODOS
}