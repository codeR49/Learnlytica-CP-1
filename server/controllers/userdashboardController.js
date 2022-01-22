const userDashboard = require('../models/userDashboard');
const QuizReports = require('../models/quizreport');
const Reports = require('../models/report');
const Questions = require('../models/question');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

const getAllReports = (req, res, next) => {
    userDashboard.find({})
        .then((rept) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rept);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const createAllReport = (req, res, next) => {
    userDashboard.create(req.body)
        .then((rept) => {
            console.log('Attempts created', rept);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(rept)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const deleteAllReports = (req, res, next) => {
    userDashboard.deleteMany({})
        .then((remove) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(remove);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getUserDashboard = (authenticate.verifyUser, (req, res) => {
    let usertoken = req.headers.authorization;
    let token = usertoken.split(' ');
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    let userid = decoded._id;
    userDashboard.findOne({ user: userid })
        .then((dash) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dash);
        })
})

const getQuizByUser = (authenticate.verifyUser, (req, res) => {
    let usertoken = req.headers.authorization;
    let token = usertoken.split(' ');
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    let userid = decoded._id;
    QuizReports.find({ user: userid })
        .populate('quizID')
        .then((dash) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dash);
        })
})

const getleaderboardByAssessment = (authenticate.verifyUser, (req, res, next) => {
    let usertoken = req.headers.authorization;
    let token = usertoken.split(' ');
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    let userid = decoded._id;
    QuizReports.find({ quizID: "61d6a02eb1be8bb03c273efc", user: userid })
        .populate('quizID')
        .then((lead) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                quizTitle: lead[0].quizID.quizName,
                score: lead[0].score,
                rank: '1'
            });
        }, (err) => next(err))
        .catch((err) => next(err));
})

const langProficiencyWithTotalCount = (authenticate.verifyUser, async (req, res) => {
    let usertoken = req.headers.authorization;
    let token = usertoken.split(' ');
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    let userid = decoded._id;
    let objLanguage = {}, totalCount;
    /*  Sum of
        **Here proficiency and is calculated for attempted language
        against no of question solved by total questions available
        and
        **no of quiz problems solved
    */
    // count of questions in db
    let countQuestions = await Questions.countDocuments();
    // count of questions fully soved in C
    let countLanguageC = await Reports.countDocuments({ user: userid, status: "Solved", languageUsed: "C" });
    // count of questions fully soved in C++
    let countLanguageCPlusPlus = await Reports.countDocuments({ user: userid, status: "Solved", languageUsed: "C++" });
    // count of questions fully soved in Java
    let countLanguageJava = await Reports.countDocuments({ user: userid, status: "Solved", languageUsed: "JAVA" });
    // count of questions fully soved in JavaScript
    let countLanguageJS = await Reports.countDocuments({ user: userid, status: "Solved", languageUsed: "JAVASCRIPT" });
    // count of questions fully soved in Ruby
    let countLanguageRUBY = await Reports.countDocuments({ user: userid, status: "Solved", languageUsed: "RUBY" });
    // count of questions fully soved in Quiz Java Full Stack
    let countJavaQuiz = await QuizReports.countDocuments({ user: userid, quizID: "61d6a02eb1be8bb03c273efc", testcasePassed: "100%" });
    console.log(countJavaQuiz);
    /*  
        language by total questions in db
        Stored as respective key value pair in objLanguage object
    */
    let proficiencyC = Math.floor((countLanguageC / countQuestions) * 100);
    objLanguage["C"] = `${proficiencyC} %`;
    let proficiencyCPlusPlus = Math.floor((countLanguageCPlusPlus / countQuestions) * 100);
    objLanguage["C++"] = `${proficiencyCPlusPlus} %`;
    let proficiencyJava = Math.floor((countLanguageJava / countQuestions) * 100);
    objLanguage["Java"] = `${proficiencyJava} %`;
    let proficiencyJs = Math.floor((countLanguageJS / countQuestions) * 100);
    objLanguage["JavaScript"] = `${proficiencyJs} %`;
    let proficiencyRuby = Math.floor((countLanguageRUBY / countQuestions) * 100);
    objLanguage["Ruby"] = `${proficiencyRuby} %`;
    // total count of problems solved in above language and quiz problems
    totalCount = countLanguageC + countLanguageCPlusPlus + countLanguageJava +
        countLanguageJS + countLanguageRUBY + countJavaQuiz;
    console.log(totalCount);

    res.setHeader('Content-Type', 'application/json');
    res.json({ "languageProficiency": objLanguage, "allProblemsSolved": totalCount });
})

module.exports = {
    getAllReports,
    createAllReport,
    deleteAllReports,
    getUserDashboard,
    getQuizByUser,
    getleaderboardByAssessment,
    langProficiencyWithTotalCount
}