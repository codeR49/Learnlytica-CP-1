var express = require('express');

const Users = require('../models/users');

var userRouter = express.Router();

var passport = require('passport');

var authenticate = require('../authenticate');
var jwt = require('jsonwebtoken');
userRouter.use(express.json());

/* GET users listing. */
userRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Users.find({})
       .then((users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
        }, (err) => next(err))
      .catch((err) => next(err));
})


userRouter.post('/signup', (req, res, next) => {
  Users.register(new Users({username: req.body.username, 
    name: req.body.name}),
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

userRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('http://localhost:3000/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
  }
});


userRouter.put('/edit/:userId', authenticate.verifyUser, (req, res, next) => {
  Users.findByIdAndUpdate(req.params.userId, {
      $set: req.body
  }, { new: true })
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})


module.exports = userRouter;
