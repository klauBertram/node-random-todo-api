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