const express = require('express');
const attemptRouter = express.Router();
const attemptController = require('../controllers/attemptController');
attemptRouter.use(express.json());

attemptRouter.route('/')
    .get(attemptController.getAllAttempts) //route for all users attempts
    .post(attemptController.createAttempt) //route to create new user attempt
    .delete(attemptController.deleteAllAttempts);//route to delete all users attempts

/* route for single user attempting particular quiz */

attemptRouter.get('/userAttempt/:quizId', attemptController.getQuizUserAttempt)

module.exports = attemptRouter;