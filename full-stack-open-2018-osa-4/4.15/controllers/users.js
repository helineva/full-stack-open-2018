const usersRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users.map(User.formatNoIdNoHash));
});

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      adult: body.adult
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'there is a problem...' });
  }
});

module.exports = usersRouter;
