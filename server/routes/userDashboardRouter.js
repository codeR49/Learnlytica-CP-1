const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/userdashboardController');
const authenticate = require('../middlewares/authenticate');
dashboardRouter.use(express.json());

dashboardRouter.route('/')
    .get(dashboardController.getAllReports) //route for each n every user reports, for admin
    .post(dashboardController.createAllReport) //route to create new dashboard report
    .delete(dashboardController.deleteAllReports);//route to delete all users dashboard report

dashboardRouter.get('/mydashboard', dashboardController.getUserDashboard);//route to show individual dashboard

dashboardRouter.get('/allassessment', dashboardController.getleaderboardByAssessment);//route to show individual leaderboard in assessment
/*
    route to show count of language proficiency and quiz problem solved
*/
dashboardRouter.get('/languageandtotalcount', dashboardController.langProficiencyWithTotalCount);
// route to count total attempted user in java quiz for admin
dashboardRouter.get('/quizdetails/:quizid', authenticate.verifyUser, authenticate.verifyAdmin, dashboardController.quizDetails);
// route for a quizz attempted by a user
dashboardRouter.get('/quizbyuser/:quizid/:userid', authenticate.verifyUser, authenticate.verifyAdmin, dashboardController.getQuizByUser);

module.exports = dashboardRouter;