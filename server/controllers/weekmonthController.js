const QuizReports = require('../models/quizreport');
const Reports = require('../models/report');
const mongoose = require('mongoose');
const moment = require('moment');

const getProblemAssessmentByMonth = async (req, res) => {
    let monthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, sum = 0;

    let quizReportsMonthly = await QuizReports.aggregate([{ $project: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } } }]);
    let reportsMonthly = await Reports.aggregate([{ $project: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } } }]);
    let joinArray = quizReportsMonthly.concat(reportsMonthly);
    for (let solved = 0; solved < joinArray.length; solved++) {
        let currentYear = joinArray[solved].year;
        let currentMonth = joinArray[solved].month;
        if (currentYear == 2022) {

            switch (currentMonth) {
                case 1:
                    monthData.series[0]++;
                    break;
                case 2:
                    monthData.series[1]++;
                    break;
                case 3:
                    monthData.series[2]++;
                    break;
                case 4:
                    monthData.series[3]++;
                    break;
                case 5:
                    monthData.series[4]++;
                    break;
                case 6:
                    monthData.series[5]++;
                    break;
                case 7:
                    monthData.series[6]++;
                    break;
                case 8:
                    monthData.series[7]++;
                    break;
                case 9:
                    monthData.series[8]++;
                    break;
                case 10:
                    monthData.series[9]++;
                    break;
                case 11:
                    monthData.series[10]++;
                    break;
                case 12:
                    monthData.series[11]++;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < monthData.series.length; total++) {
        sum += monthData.series[total];
    }

    monthData.sum = sum;

    res.json(monthData);
}

const getAssessmentScoreByMonth = async (req, res) => {
    let monthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, sum = 0;

    let quizScoreMonthly = await QuizReports
        .aggregate([{ $match: { score: { $gt: 0, $lte: 100 } } }, {
            $project: {
                year: { $year: "$timestamp" },
                month: { $month: "$timestamp" }, score: "$score"
            }
        }]);

    for (let score = 0; score < quizScoreMonthly.length; score++) {
        let currentYear = quizScoreMonthly[score].year;
        let currentMonth = quizScoreMonthly[score].month;
        let currentScore = quizScoreMonthly[score].score;

        if (currentYear == 2022) {

            switch (currentMonth) {
                case 1:
                    monthData.series[0] += currentScore;
                    break;
                case 2:
                    monthData.series[1] += currentScore;
                    break;
                case 3:
                    monthData.series[2] += currentScore;
                    break;
                case 4:
                    monthData.series[3] += currentScore;
                    break;
                case 5:
                    monthData.series[4] += currentScore;
                    break;
                case 6:
                    monthData.series[5] += currentScore;
                    break;
                case 7:
                    monthData.series[6] += currentScore;
                    break;
                case 8:
                    monthData.series[7] += currentScore;
                    break;
                case 9:
                    monthData.series[8] += currentScore;
                    break;
                case 10:
                    monthData.series[9] += currentScore;
                    break;
                case 11:
                    monthData.series[10] += currentScore;
                    break;
                case 12:
                    monthData.series[11] += currentScore;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < monthData.series.length; total++) {
        sum += monthData.series[total];
    }

    monthData.sum = sum;

    res.json(monthData);
}

const getProblemAssessmentByMonthByUser = async (req, res) => {
    let monthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, sum = 0;

    let quizReportsMonthly = await QuizReports.aggregate([{ $match: { 'user': mongoose.Types.ObjectId(req.params.userid) }},
        { $project: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } } }]);
        
    let reportsMonthly = await Reports.aggregate([{ $match: { 'user': mongoose.Types.ObjectId(req.params.userid)} },
        { $project: { year: { $year: "$timestamp" }, month: { $month: "$timestamp" } } }]);
    let joinArray = quizReportsMonthly.concat(reportsMonthly);
    for (let solved = 0; solved < joinArray.length; solved++) {
        let currentYear = joinArray[solved].year;
        let currentMonth = joinArray[solved].month;
        if (currentYear == 2022) {

            switch (currentMonth) {
                case 1:
                    monthData.series[0]++;
                    break;
                case 2:
                    monthData.series[1]++;
                    break;
                case 3:
                    monthData.series[2]++;
                    break;
                case 4:
                    monthData.series[3]++;
                    break;
                case 5:
                    monthData.series[4]++;
                    break;
                case 6:
                    monthData.series[5]++;
                    break;
                case 7:
                    monthData.series[6]++;
                    break;
                case 8:
                    monthData.series[7]++;
                    break;
                case 9:
                    monthData.series[8]++;
                    break;
                case 10:
                    monthData.series[9]++;
                    break;
                case 11:
                    monthData.series[10]++;
                    break;
                case 12:
                    monthData.series[11]++;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < monthData.series.length; total++) {
        sum += monthData.series[total];
    }

    monthData.sum = sum;

    res.json(monthData);
}

const getProblemAssessmentByWeek = async (req, res) => {
    
    let currentWeek = moment().isoWeek();
    console.log(currentWeek); 
    let weekData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [0, 0, 0, 0, 0, 0, 0]
      }, sum = 0;

    let quizReportsWeekly = await QuizReports.aggregate([{ $project: { week: { $isoWeek: "$timestamp" }, dayofweek: { $isoDayOfWeek: "$timestamp"}} }]);
    let reportsWeekly = await Reports.aggregate([{ $project: { week: { $isoWeek: "$timestamp" }, dayofweek: { $isoDayOfWeek: "$timestamp"}} }]);
    let joinArray = quizReportsWeekly.concat(reportsWeekly);
    for (let solved = 0; solved < joinArray.length; solved++) {
        let currentWeekDB = joinArray[solved].week;
        let currentDayOfWeek = joinArray[solved].dayofweek;
        if (currentWeek == currentWeekDB) {

            switch (currentDayOfWeek) {
                case 1:
                    weekData.series[0]++;
                    break;
                case 2:
                    weekData.series[1]++;
                    break;
                case 3:
                    weekData.series[2]++;
                    break;
                case 4:
                    weekData.series[3]++;
                    break;
                case 5:
                    weekData.series[4]++;
                    break;
                case 6:
                    weekData.series[5]++;
                    break;
                case 7:
                    weekData.series[6]++;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < weekData.series.length; total++) {
        sum += weekData.series[total];
    }

    weekData.sum = sum;

    res.json(weekData);
}

const getAssessmentScoreByWeek = async (req, res) => {
    
    let currentWeek = moment().isoWeek();
    console.log(currentWeek); 
    let weekData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [0, 0, 0, 0, 0, 0, 0]
      }, sum = 0;

    let quizReportsWeekly = await QuizReports.aggregate([{ $match: { score: { $gt: 0, $lte: 100 } } },
        { $project: { week: { $isoWeek: "$timestamp" }, dayofweek: { $isoDayOfWeek: "$timestamp"}, score: "$score"} }]);
    
    for (let score = 0; score < quizReportsWeekly.length; score++) {
        let currentWeekDB = quizReportsWeekly[score].week;
        let currentDayOfWeek = quizReportsWeekly[score].dayofweek;
        let currentScore = quizReportsWeekly[score].score;
        if (currentWeek == currentWeekDB) {

            switch (currentDayOfWeek) {
                case 1:
                    weekData.series[0] += currentScore;
                    break;
                case 2:
                    weekData.series[1] += currentScore;
                    break;
                case 3:
                    weekData.series[2] += currentScore;
                    break;
                case 4:
                    weekData.series[3] += currentScore;
                    break;
                case 5:
                    weekData.series[4] += currentScore;
                    break;
                case 6:
                    weekData.series[5] += currentScore;
                    break;
                case 7:
                    weekData.series[6] += currentScore;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < weekData.series.length; total++) {
        sum += weekData.series[total];
    }

    weekData.sum = sum;

    res.json(weekData);
}

const getProblemAssessmentByWeekByUser = async (req, res) => {
    
    let currentWeek = moment().isoWeek();
    console.log(currentWeek); 
    let weekData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [0, 0, 0, 0, 0, 0, 0]
      }, sum = 0;

    let quizReportsWeekly = await QuizReports.aggregate([{ $match: { 'user': mongoose.Types.ObjectId(req.params.userid) }},
    { $project: { week: { $isoWeek: "$timestamp" }, dayofweek: { $isoDayOfWeek: "$timestamp"}} }]);

    let reportsWeekly = await Reports.aggregate([{ $match: { 'user': mongoose.Types.ObjectId(req.params.userid) }},
    { $project: { week: { $isoWeek: "$timestamp" }, dayofweek: { $isoDayOfWeek: "$timestamp"}} }]);

    let joinArray = quizReportsWeekly.concat(reportsWeekly);
    for (let solved = 0; solved < joinArray.length; solved++) {
        let currentWeekDB = joinArray[solved].week;
        let currentDayOfWeek = joinArray[solved].dayofweek;
        if (currentWeek == currentWeekDB) {

            switch (currentDayOfWeek) {
                case 1:
                    weekData.series[0]++;
                    break;
                case 2:
                    weekData.series[1]++;
                    break;
                case 3:
                    weekData.series[2]++;
                    break;
                case 4:
                    weekData.series[3]++;
                    break;
                case 5:
                    weekData.series[4]++;
                    break;
                case 6:
                    weekData.series[5]++;
                    break;
                case 7:
                    weekData.series[6]++;
                    break;
                default:
                    break;
            }

        }
    }
    for (let total = 0; total < weekData.series.length; total++) {
        sum += weekData.series[total];
    }

    weekData.sum = sum;

    res.json(weekData);
}

module.exports = {
    getProblemAssessmentByMonth,
    getAssessmentScoreByMonth,
    getProblemAssessmentByMonthByUser,
    getProblemAssessmentByWeek,
    getAssessmentScoreByWeek,
    getProblemAssessmentByWeekByUser
}