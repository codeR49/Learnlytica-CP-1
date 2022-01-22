const express = require('express');
const quizReport = express.Router();
const quizscoreController = require("../controllers/quizscoreController");
quizReport.use(express.json());

quizReport.route('/')
  .get(quizscoreController.getAllQuizScores)//route to get all quiz scores
  .post(quizscoreController.createQuizReport);//route to create a quiz scores

/* route to a get avg score for a quiz*/
quizReport.route('/getscore')
  .get(quizscoreController.getUserAvgScore)

/* route to show leaderboard for a java quiz*/
quizReport.route('/javaleaderboard')
  .get(quizscoreController.showjavaleaderboard)

module.exports = quizReport;