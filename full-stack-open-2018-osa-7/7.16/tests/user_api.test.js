const supertest = require('supertest');
const { app, server } = require('../index.js');
const api = supertest(app);
const User = require('../models/user.js');
const { getUsers } = require('./test_helper.js');

describe('POST request to /api/users', () => {
  beforeEach(async () => {
    await User.remove({});
  });

  test('user missing a username will not be added and will be responded properly', async () => {
    const user = {
      name: 'Donald Knuth',
      password: 'topsecret',
      adult: true
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({ error: 'missing username' });

    const noOfUsersAfter = await getUsers();
    expect(noOfUsersAfter.length).toBe(0);
  });

  test('user having a nonunique username will not be added and will be responded properly', async () => {
    const user1 = {
      username: 'dknuth',
      name: 'Donald Knuth',
      password: 'topsecret',
      adult: true
    };

    const user2 = {
      username: 'dknuth',
      name: 'Don Knuth',
      password: 'topsecret',
      adult: true
    };

    await api
      .post('/api/users')
      .send(user1);

    const result = await api
      .post('/api/users')
      .send(user2)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({ error: 'username must be unique' });

    const noOfUsersAfter = await getUsers();
    expect(noOfUsersAfter.length).toBe(1);
  });

  test('user missing a password will not be added and will be responded properly', async () => {
    const user = {
      username: 'dknuth',
      name: 'Don Knuth',
      adult: true
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({ error: 'missing password' });

    const noOfUsersAfter = await getUsers();
    expect(noOfUsersAfter.length).toBe(0);
  });

  test('user having a too short password will not be added and will be responded properly', async () => {
    const user = {
      username: 'dknuth',
      name: 'Don Knuth',
      password: 'dk',
      adult: true
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual({ error: 'password must be at least 3 characters long' });

    const noOfUsersAfter = await getUsers();
    expect(noOfUsersAfter.length).toBe(0);
  });

  test('user having a valid username and password will be added and properly responded', async () => {
    const user = {
      username: 'dknuth',
      name: 'Don Knuth',
      password: 'topsecret',
      adult: true
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await getUsers();
    expect(usersAfter.length).toBe(1);
  });

});

afterAll(async () => {
  server.close();
});
