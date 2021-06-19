import { Application } from 'express';
import { assert } from 'chai';
import { User } from '../src/entity/User';
import { userInterface } from '../src/interface/User';
import { createConnection, getConnectionOptions } from 'typeorm';
import supertest from 'supertest';
import { Server } from '../src/server';
import { dbConnection } from '../src/dbServer';

let app: Application;

before(async () => {
  try {
    await dbConnection();
    app = new Server().app;
    await app.listen(4000);
  } catch (err) {
    console.log(err);
  }
});
// import 'module-alias/register';

describe('Testing user component', () => {
  const testUser: userInterface = User.mockTestBoard();
  let testUserModified: userInterface;

  describe('POST /users', () => {
    it('responds with status 400', (done) => {
      supertest(app)
        .post('/users')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done());
    });

    it('responds with new user', (done) => {
      supertest(app)
        .post('/users')
        .send(testUser)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .end((err, res) => {
          try {
            if (err) throw err;
            const status = res.statusCode;
            const user: User = res.body;
            // Assert status
            assert(status === res.status, 'status does not match');

            // Assert user
            assert.isObject(user, 'user should be an object');
            assert(user.firstName === testUser.firstName, 'userFirstname does not match');
            assert(user.lastName === testUser.lastName, 'userLastname does not match');
            assert(user.age === testUser.age, 'age does not match');
            testUserModified = user;
            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('GET /users', () => {
    it('responds with user array', (done) => {
      supertest(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;
            const users: User[] = res.body;

            // Assert status
            assert(status === res.status, 'status does not match');

            // Assert users
            assert.isArray(users, 'users should be an array');
            assert(users[0].firstName === testUser.firstName, 'userFirstname does not match');
            assert(users[0].lastName === testUser.lastName, 'userLastname does not match');
            assert(users[0].age === testUser.age, 'userLastname does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('GET /users/:id', () => {
    it('responds with single user', (done) => {
      supertest(app)
        .get(`/users/${testUserModified.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;
            const user: User = res.body;

            // Assert status
            assert(status === res.statusCode, 'status does not match');

            // Assert user
            assert.isObject(user, 'user should be an object');
            assert(user.id === testUserModified.id, 'userID does not match');
            assert(user.firstName === testUserModified.firstName, 'userFirstname does not match');
            assert(user.lastName === testUserModified.lastName, 'userLastname does not match');
            assert(user.age === testUser.age, 'userLastname does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe('DELETE /users/1', () => {
    it('responds with status 204', (done) => {
      supertest(app)
        .delete(`/users/${testUserModified.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;

            // Assert status
            assert(status === 204, 'status does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it('responds with status 404', (done) => {
      supertest(app)
        .delete(`/users/${testUserModified.id}`)
        .end((err, res) => {
          try {
            if (err) throw err;

            const status = res.statusCode;

            // Assert status
            assert(status === 404, 'status does not match');

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
