// api/index.js
const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

//USER MIDDLEWARE
// set `req.user` if possible
//Sets up the process to require user authorization
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  //Requires the authorizaiton header
  const auth = req.header('Authorization');
  console.log(req.headers);
  if (!auth) {
    // nothing to see here
    next();
    //Checks if token starts with bearer prefix
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      //JWT Secret in .env
      const obj = jwt.verify(token, JWT_SECRET);

      console.log(obj);

      const { id } = obj;

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }

  next();
});

//Assign the routes for apis
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);


apiRouter.use((error, req, res, next) => {
  res.status(500).send({ error: { name: error.name, message: error.message } });

});


module.exports = apiRouter;

