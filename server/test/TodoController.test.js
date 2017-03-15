const expect = require('chai').expect;
const { ObjectID } = require('mongodb');
const request = require('supertest');

const { app } = require('../server');
const { populateTodos, TODOS } = require('./seed/seed');
const { Todo } = require('../models/todo');

beforeEach(populateTodos);

describe('DELETE todos', () => {
  it('should delete todo', (done) => {
    let id = TODOS[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        Todo.findById(id).then((todo) => {
          expect(todo).to.not.exist;
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

  it('should not delete todo on invalid id', (done) => {
    let id = '123';

    request(app)
      .delete(`/todos/${id}`)
      .expect(404, done);
  });
});

describe('GET todos', () => {
  it('should get a list of todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todos[0].text).to.equal('go to sleep');
        expect(res.body.todos[1].text).to.equal('take a shower');

        done();
      });
  });

  it('should return a sorted list of todos based on rank', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todos[3].rank).to.be.above(res.body.todos[2].rank);
        expect(res.body.todos[2].rank).to.be.above(res.body.todos[1].rank);
        expect(res.body.todos[1].rank).to.be.above(res.body.todos[0].rank);

        done();
      });
  });
});

describe('PATCH todos', () => {
  it('should update todo, marked as complete', (done) => {
    let text = 'edited';
    let todoId = TODOS[0]._id.toHexString();

    request(app)
      .patch(`/todos/${todoId}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todo.text).to.equal(text);
        expect(res.body.todo.completed).to.equal(true);
        expect(res.body.todo.completedAt).to.be.a('number');
        
        done();
      });
  });

  it('should update todo, marked as complete with boolean as string', (done) => {
    let text = 'edited';
    let todoId = TODOS[0]._id.toHexString();

    request(app)
      .patch(`/todos/${todoId}`)
      .send({
        text,
        completed: 'true'
      })
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todo.text).to.equal(text);
        expect(res.body.todo.completed).to.equal(true);
        expect(res.body.todo.completedAt).to.be.a('number');
        
        done();
      });
  });

  it('should update todo, marked as incomplete', (done) => {
    let todoId = TODOS[1]._id.toHexString();

    request(app)
      .patch(`/todos/${todoId}`)
      .send({
        text: 'edited 2',
        completed: false
      })
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todo.text).to.equal('edited 2');
        expect(res.body.todo.completed).to.equal(false);
        expect(res.body.todo.completedAt).to.be.null;
        
        done();
      });
  });

  it('should not update todo on invalid id', (done) => {
    let todoId = '123';

    request(app)
      .patch(`/todos/${todoId}`)
      .expect(404)
      .end((err, res) => {
        if(err) return done(err);

        done();
      });
  });
});

describe('POST todos', () => {
  it('should create a todo', (done) => {
    request(app)
      .post('/todos')
      .send({
        text: 'play piano'
      })
      .expect(201)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.body.todo.text).to.equal('play piano');
        expect(res.body.todo.rank).to.be.a('number');

        done();
      });
  });

  it('should not create a todo', (done) => {
    request(app)
      .post('/todos')
      .expect(400, done);
  });
});