const express = require('express');

var jwt = require('jsonwebtoken');

const Attempts = require('../models/attempt');

const attemptRouter = express.Router();

var authenticate = require('../authenticate');


attemptRouter.use(express.json());

attemptRouter.route('/')
.get((req,res,next) => {
    Attempts.find({})
    .then((attm) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(attm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Attempts.create(req.body)
    .then((attm) => {
        console.log('Attempts created', attm);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(attm)
    }, (err) => next(err))
   .catch((err)=> next(err))
})
.put((req, res, next) => {
    res.statusCode =403;
    res.end('PUT operation not supported on /attempts');
})
.delete((req, res, next) => {
    Attempts.deleteMany({})
    .then((remove) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(remove);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

/* ######################################## */

attemptRouter.get('/userAttempt/:quizId', authenticate.verifyUser, (req,res,next) => {

     let usertoken = req.headers.authorization;

    let token = usertoken.split(' ');

     let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
     let userid = decoded._id;
    
    Attempts.find({quizID:req.params.quizId, userID: userid})
    .then((attm) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(attm);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = attemptRouter;