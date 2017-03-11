const expect = require('chai').expect;
const request = require('supertest');

const { app } = require('../server');
const { populateTodos } = require('./seed/seed');

beforeEach(populateTodos);

describe('loading express', () => {
  it('should responds to /', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should not responds to /foo/bar', (done) => {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('GET todos', () => {
  it('should get a list of todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        expect(res.body.todos[0].text).to.equal('go to sleep');
        expect(res.body.todos[1].text).to.equal('take a shower');

        done();
      });
  });
});

describe('PATCH todos', () => {
  it('should update todo, marked as completed', (done) => {
  });

  it('should update todo, marked as incompleted', (done) => {
  });

  it('should not update todo', (done) => {
  });
});

describe('POST todos', () => {
  it('should create a todo', (done) => {
    request(app)
      .post('/todos')
      .send({
        text: 'play piano'
      })
      .expect(200)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        expect(res.body.todo.text).to.equal('play piano');

        done();
      });
  });

  it('should not create a todo', (done) => {
    request(app)
      .post('/todos')
      .send({
      })
      .expect(400, done);
  });
});