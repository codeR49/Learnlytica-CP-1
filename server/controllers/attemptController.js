const Attempts = require('../models/attempt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

const getAllAttempts = (req, res, next) => {
    Attempts.find({})
        .then((attm) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(attm);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const createAttempt = (req, res, next) => {
    Attempts.create(req.body)
        .then((attm) => {
            console.log('Attempts created', attm);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(attm)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const deleteAllAttempts = (req, res, next) => {
    Attempts.deleteMany({})
        .then((remove) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(remove);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getQuizUserAttempt = (authenticate.verifyUser, (req, res) => {
    let usertoken = req.headers.authorization;
    let token = usertoken.split(' ');
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    let userid = decoded._id;
    Attempts.find({ quizID: req.params.quizId, userID: userid })
        .then((attm) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(attm);
        })
})

module.exports = {
    getAllAttempts,
    createAttempt,
    deleteAllAttempts,
    getQuizUserAttempt
};