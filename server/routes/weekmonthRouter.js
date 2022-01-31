const express = require('express');
const weekMonthRouter = express.Router();
const weekMonthController = require('../controllers/weekmonthController');
const authenticate = require('../middlewares/authenticate');
weekMonthRouter.use(express.json());

weekMonthRouter.get('/getprobquizbymonth', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getProblemAssessmentByMonth);

weekMonthRouter.get('/getavgquizscorebymonth', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getAssessmentScoreByMonth);

weekMonthRouter.get('/getprobquizbymonthbyuser/:userid', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getProblemAssessmentByMonthByUser);

weekMonthRouter.get('/getprobquizbyweek', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getProblemAssessmentByWeek);

weekMonthRouter.get('/getavgquizscorebyweek', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getAssessmentScoreByWeek);

weekMonthRouter.get('/getprobquizbyweekbyuser/:userid', authenticate.verifyUser, authenticate.verifyAdmin, weekMonthController.getProblemAssessmentByWeekByUser);

module.exports = weekMonthRouter;

