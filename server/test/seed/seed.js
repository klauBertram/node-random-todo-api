const { ObjectID } = require('mongodb');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

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

const USERS = [{
  _id: new ObjectID(),
  email: 'tony@si.com',
  password: '123456'
}, {
  _id: new ObjectID(),
  email: 'pepper@si.com',
  password: 'abcdef'  
}]

const populateTodos = (done) => {
  // remove all todos then re-add items
  Todo.remove({}).then(() => {
    return Todo.insertMany(TODOS).then(() => done());
  });
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    return User.insertMany(USERS).then(() => done());
  });
}

module.exports = {
  populateTodos,
  populateUsers,
  TODOS,
  USERS
}