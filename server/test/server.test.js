const expect = require('chai').expect;
const request = require('supertest');

const { app } = require('../server');

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

describe('creating todos', () => {
  it('should create a todo', (done) => {
    request(app)
      .post('/todos')
      .send({
        text: 'play piano'
      })
      .expect(200)
      .end((error, result) => {
        if(error){
          return done(error);
        }

        expect(result.body.todo.text).to.be.a('string');
        // expect('test').to.be.a('number');

        done();
      });
  });
});