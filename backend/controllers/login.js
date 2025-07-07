const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    console.log('Login intent:', username);
    console.log('Found user:', user);
    console.log('Password correct:', passwordCorrect);
    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: 'invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id });
  } catch (error) {
    console.error('ERROR IN LOGIN: ', error);
    return response.status(500).json({ error: 'internal server error' });
  }
});

module.exports = loginRouter;
