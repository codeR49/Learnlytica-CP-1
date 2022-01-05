const express = require('express');

const Quiz = require('../models/quiz');

const quizRouter = express.Router();

//const quizController = require("../controllers/quizController");

quizRouter.use(express.json());

quizRouter.route('/')
.get((req,res,next) => {
    Quiz.find({})
    .then((quiz) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quiz);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Quiz.create(req.body)
    .then((quiz) => {
        console.log('Question created', quiz);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(quiz)
    }, (err) => next(err))
   .catch((err)=> next(err))
})
.put((req, res, next) => {
    res.statusCode =403;
    res.end('PUT operation not supported on /quiz');
})
.delete((req, res, next) => {
    Quiz.deleteMany({})
    .then((quiz) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quiz);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

quizRouter.route('/javafullstack')
.get((req,res,next) => {
    Quiz.find({quizName: "Java Full Stack Quiz"})
    .then((quiz) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quiz);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// quizRouter.route("/")
// .post(quizController.createQuiz);


module.exports = quizRouter;