const supertest = require('supertest');
const { app, server } = require('../index.js');
const api = supertest(app);
const User = require('../models/user.js');

beforeAll( async () => {
  await User.remove({});
});

describe('POST request to /api/login', () => {

  test('nonexisting user will be responded properly', async () => {
    const credentials = {
      username: 'nonexisting user',
      password: 'password'
    };

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual({ error: 'invalid username or password' });
  });

  test('existing user will be responded properly', async () => {
    const user = {
      username: 'dknuth',
      name: 'Don Knuth',
      password: 'topsecret',
      adult: true
    };

    await api
      .post('/api/users')
      .send(user);

    const credentials = {
      username: user.username,
      password: user.password
    };

    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('username', user.username);
  });

});

afterAll(() => {
  server.close();
});
