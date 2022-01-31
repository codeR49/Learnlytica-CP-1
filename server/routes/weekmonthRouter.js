const express = require('express');
const weekMonthRouter = express.Router();
const weekMonthController = require('../controllers/weekmonthController');
const authenticate = require('../middlewares/authenticate');
weekMonthRouter.use(express.json());

weekMonthRouter.get('/getprobquizbymonth', weekMonthController.getProblemAssessmentByMonth);

weekMonthRouter.get('/getavgquizscorebymonth', weekMonthController.getAssessmentScoreByMonth);

weekMonthRouter.get('/getprobquizbymonthbyuser/:userid', weekMonthController.getProblemAssessmentByMonthByUser);

weekMonthRouter.get('/getprobquizbyweek', weekMonthController.getProblemAssessmentByWeek);

weekMonthRouter.get('/getavgquizscorebyweek', weekMonthController.getAssessmentScoreByWeek);

weekMonthRouter.get('/getprobquizbyweekbyuser/:userid', weekMonthController.getProblemAssessmentByWeekByUser);

module.exports = weekMonthRouter;

