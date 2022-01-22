const Questions = require('../models/question');

const getAllQuestions = (req, res, next) => {
    Questions.find({})
        .then((ques) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ques);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const createQuestion = (req, res, next) => {
    Questions.create(req.body)
        .then((ques) => {
            console.log('Question created', ques);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(ques)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const deleteAllQuestions = (req, res, next) => {
    Questions.remove({})
        .then((enroll) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(enroll);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getDynamicQuestions = (req, res, next) => {
    Questions.find({ category: "Dynamic Programming" })
        .then((ques) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ques);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getAlgoQuestions = (req, res, next) => {
    Questions.find({ category: "Algorithm" })
        .then((ques) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ques);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getQuestionById = (req, res, next) => {
    Questions.findById(req.params.quesId)
        .then((ques) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ques);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateQuestionById = (req, res, next) => {
    Questions.findByIdAndUpdate(req.params.quesId, {
        $set: req.body
    }, { new: true })
        .then((ques) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ques);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteQuestionById = (req, res, next) => {
    Questions.findByIdAndRemove(req.params.quesId)
        .then((resp) => {
            res.setHeader('Content-Type', 'application/json');
            res.send("Deleted successfully")
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    getAllQuestions,
    getAlgoQuestions,
    createQuestion,
    deleteAllQuestions,
    getDynamicQuestions,
    getAlgoQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById
};