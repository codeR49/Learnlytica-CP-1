const Quiz = require('../models/quiz');

const getAllQuiz = (req, res, next) => {
    Quiz.find({})
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const createQuiz = (req, res, next) => {
    Quiz.create(req.body)
        .then((quiz) => {
            console.log('Question created', quiz);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(quiz)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const deleteAllQuiz = (req, res, next) => {
    Quiz.deleteMany({})
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getJavaFullStackQuiz = (req, res, next) => {
    Quiz.find({ quizName: "Java Full Stack Quiz" })
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getQuizById = (req, res, next) => {
    Quiz.findById(req.params.quizId)
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateQuizById = (req, res, next) => {
    Quiz.findByIdAndUpdate(req.params.quizId, {
        $set: req.body
    }, { new: true })
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(quiz);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteQuizById = (req, res, next) => {
    Quiz.findByIdAndRemove(req.params.quizId)
        .then((resp) => {
            res.setHeader('Content-Type', 'application/json');
            res.send("Deleted successfully")
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    getAllQuiz,
    createQuiz,
    deleteAllQuiz,
    getJavaFullStackQuiz,
    getQuizById,
    updateQuizById,
    deleteQuizById
}