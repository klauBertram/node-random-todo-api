const expect = require('chai').expect;
const request = require('supertest');

const { app } = require('../server');
const { populateUsers, USERS } = require('./seed/seed'); 
const { User } = require('../models/user');

beforeEach(populateUsers);

describe('POST users', () => {
  it('should create user', (done) => {
    let email = 'kenn@keenresearch.com';
    let password = '111222';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(201)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.user._id).to.exist;
        expect(res.body.user.email).to.equal(email);
        expect(res.body.user.password).to.not.exist;
        done();
      });
  });
});