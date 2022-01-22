const express = require('express');
const questionRouter = express.Router()
const questionController = require("../controllers/questionController");
questionRouter.use(express.json());

questionRouter.route('/')
    .get(questionController.getAllQuestions) //route for all questions
    .post(questionController.createQuestion) //route to create new question
    .delete(questionController.deleteAllQuestions); //route to delete all questions

/* routes to get algo category questions */
questionRouter.route('/categoryalgo')
    .get(questionController.getAlgoQuestions)

/* routes to get dynamic category questions */
questionRouter.route('/categorydynamic')
    .get(questionController.getDynamicQuestions)

questionRouter.route('/:quesId')
    .get(questionController.getQuestionById)// get question with this id
    .put(questionController.updateQuestionById)//update question with this id
    .delete(questionController.deleteQuestionById);//delete question with this id


module.exports = questionRouter;
