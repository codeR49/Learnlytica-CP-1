const express = require('express');
const quizRouter = express.Router();
const quizController = require("../controllers/quizController");
quizRouter.use(express.json());

quizRouter.route('/')
    .get(quizController.getAllQuiz) //route to get all quizzes
    .post(quizController.createQuiz)//route to create a quiz
    .delete(quizController.deleteAllQuiz);//route to delete all quizzes

/* Route for java quiz  */
quizRouter.route('/javafullstack')
    .get(quizController.getJavaFullStackQuiz)

quizRouter.route('/:quizId')
    .get(quizController.getQuizById)//Route to get quiz by id
    .put(quizController.updateQuizById)//Route to update quiz by id
    .delete(quizController.deleteQuizById);//Route to delete quiz by id

module.exports = quizRouter;