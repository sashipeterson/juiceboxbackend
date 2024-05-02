const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');

const { 
  createUser,
  getAllUsers,
  getUserByUsername,
  getPostsByUser,
} = require('../db');

const jwt = require('jsonwebtoken');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
  
    res.send({
      users
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
     
       req.user = user;
      
      res.send({ 
        message: "you're logged in!",
        token 
      });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});

//Get Posts by User ID
usersRouter.get('/:userId/posts', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userPost = await getPostsByUser(userId);
    if (userPost) {
      res.send(userPost);
    } else {
      next({
        name: 'Not Found',
        message: `No posts found ${req.params.userId}`
      })
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);
  
    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message });
  } 
});

module.exports = usersRouter;
