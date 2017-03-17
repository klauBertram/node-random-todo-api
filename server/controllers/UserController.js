const _ = require('lodash');
const router = require('express').Router();

const { User } = require('../models/user');

// POST Users
router.post('/', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  // user.save().then((user) => {
  //   res.status(201).send({ user });
  // });

  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).status(201).send({ user });
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = router;