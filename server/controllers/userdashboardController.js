const userDashboard = require('../models/userDashboard');
const QuizReports = require('../models/quizreport');
const Reports = require('../models/report');
const Questions = require('../models/question');
const Quiz = require('../models/quiz');
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

const getQuizByUser = (req, res) => {

    let  avgTestcasePassed, avgCompileTime, resObj = {}, count = 1;
    QuizReports.find({ user: req.query.userid })
        .populate('quizID')
        .then((dash) => {
            // let quizid = dash[0].quizID.toString();
            // console.log(quizid);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            for (let i = 0; i < dash.length; i++) {
                let quizName = dash[i].quizID.quizName;
                if (!(resObj.hasOwnProperty(quizName))) {
                    resObj[quizName] = {
                        "score": dash[i]["score"]
                    }
                    //languageUsed.push(dash[i]["languageUsed"]);
                    resObj[quizName]["languageUsed"] = dash[i]["languageUsed"];
                    avgTestcasePassed = Number(dash[i]["testcasePassed"].match(/\d+/)[0]);
                    resObj[quizName]["avgTestCaseComplexity"] = avgTestcasePassed;
                    avgCompileTime = Number(dash[i]["compileTime"].match(/\d+/)[0]);
                    resObj[quizName]["avgCompiletime"] = avgCompileTime;
                    resObj[quizName]["count"] = count;
                }
                else {
                    resObj[quizName]["score"] += dash[i]["score"];

                    //languageUsed.push(dash[i]["languageUsed"]);

                    resObj[quizName]["languageUsed"] += `,${dash[i]["languageUsed"]}`;
                    avgTestcasePassed = Number(dash[i]["testcasePassed"].match(/\d+/)[0]);
                    resObj[quizName]["avgTestCaseComplexity"] += avgTestcasePassed;
                    avgCompileTime = Number(dash[i]["compileTime"].match(/\d+/)[0]);
                    resObj[quizName]["avgCompiletime"] += avgCompileTime;
                    resObj[quizName]["count"] += 1;
                }
            }
            
            let entries = Object.entries(resObj);

            for (let i = 0; i < entries.length; i++) {
                let language = Array.from(new Set(entries[i][1]["languageUsed"].split(','))).toString();
                language = language.split(",");
                let testCase = Math.floor(entries[i][1]["avgTestCaseComplexity"] / entries[i][1]["count"]);
                let compileTime = Math.floor(entries[i][1]["avgCompiletime"] / entries[i][1]["count"]);
                entries[i][1]["avgTestCaseComplexity"] = `${testCase} %`;
                entries[i][1]["avgCompiletime"] = compileTime;
                entries[i][1]["languageUsed"] = language;
                
            }

            res.json(entries);
        })

}

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

const onequizDetails = (req, res, next) => {
    QuizReports.find({ quizID: req.params.quizid })
        .populate('user question')
        .then((lead) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            /* loop for no of users in this quiz */
            let leaderboard = {};
            let avgAssessmentScore = 0, countQuizUser, assessmentTestCaseEfficiency;
            for (let i = 0; i < lead.length; i++) {
                let currentUser = lead[i].user.username;
                let currentQuestion = lead[i].question.title;
                if (!(leaderboard.hasOwnProperty(currentUser))) {
                    leaderboard[currentUser] = {
                        "totalScore": lead[i]["score"]
                    }
                    leaderboard[currentUser][currentQuestion] = lead[i]["score"];
                }
                else {
                    leaderboard[currentUser][currentQuestion] = lead[i]["score"];
                    leaderboard[currentUser]["totalScore"] += lead[i]["score"];
                }
            }
            /* For sorting, converting obj to array*/
            let entries = Object.entries(leaderboard);
            /* Sorting from high to low*/
            let sortAvgScore = entries.sort((a, b) => {
                return b[1].totalScore - a[1].totalScore
            });
            countQuizUser = sortAvgScore.length;
            for (let i = 0; i < sortAvgScore.length; i++) {
                avgAssessmentScore += sortAvgScore[i][1].totalScore;
                sortAvgScore[i].push({
                    "Rank": i + 1
                })
            }
            assessmentTestCaseEfficiency = Math.floor((avgAssessmentScore / (countQuizUser * 300)) * 100);
            avgAssessmentScore = Math.floor(avgAssessmentScore / countQuizUser);
            res.json({
                sortAvgScore,
                "Total Quiz Participant": countQuizUser,
                "Average Assessment Score": avgAssessmentScore,
                "Quiz Test Case Efficiency": `${assessmentTestCaseEfficiency} %`
            });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getallQuizDetails = (req, res, next) => {
    QuizReports.find({})
        .populate('user')
        .then((lead) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            /* loop for no of users in this quiz */
            let leaderboard = {}, countQuizUser, avgTestcasePassed,
             avgAssessmentScore=0, assessmentTestCaseEfficiency=0, count=0;
            for (let i = 0; i < lead.length; i++) {
                let currentUser = lead[i].user.username;
                if (!(leaderboard.hasOwnProperty(currentUser))) {
                    leaderboard[currentUser] = {
                        "totalScore": lead[i]["score"] 
                    }
                    avgTestcasePassed = Number(lead[i]["testcasePassed"].match(/\d+/)[0]);
                    leaderboard[currentUser]["avgTestCaseComplexity"] = avgTestcasePassed;
                    count += 1;
                }
                else {
                    leaderboard[currentUser]["totalScore"] += lead[i]["score"];
                    avgTestcasePassed = Number(lead[i]["testcasePassed"].match(/\d+/)[0]);
                    leaderboard[currentUser]["avgTestCaseComplexity"] += avgTestcasePassed;
                    count += 1;
                }
            }
            // /* converting leaderboard obj to array*/
             let entries = Object.entries(leaderboard);
            
             countQuizUser = entries.length;
             
            for (let i = 0; i < entries.length; i++) {
                avgAssessmentScore += entries[i][1].totalScore;
                assessmentTestCaseEfficiency += entries[i][1].avgTestCaseComplexity
            }
             assessmentTestCaseEfficiency = Math.floor(assessmentTestCaseEfficiency / count);
             avgAssessmentScore = Math.floor(avgAssessmentScore / countQuizUser);
            
            res.json({
                
                "Total Users": countQuizUser,
                "Average Assessment Score": `${avgAssessmentScore}/300`,
                "Average Test Case Efficiency": `${assessmentTestCaseEfficiency} %`
            });
            //res.json(leaderboard);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const showallQuizTopper = (req, res, next) => {
    QuizReports.find({})
      .populate('quizID user question')
      .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        /* loop for no of users in this quiz */
        //console.log(lead);
        let leaderboard = {};
        for (let i = 0; i < lead.length; i++) {
          let currentQuiz = lead[i].quizID.quizName
          let currentUser = lead[i].user.username;
          let currentQuestion = lead[i].question.title;
          let currentScore = lead[i].score;
          let currentTestCase = lead[i].testcasePassed;
          if (!(leaderboard.hasOwnProperty(currentQuiz))) {
            // leaderboard[currentUser] = {
            //     "totalScore": lead[i]["score"]
            // }
            leaderboard[currentQuiz] = {
              currentUser: {currentUser}
            //   "avgscore": {
            //       currentScore
            //   },
            //   "avgTestCase": {
            //       currentTestCase
            //   }
            }
            //leaderboard[currentUser][currentQuestion] = lead[i]["score"];
          }
        //   else {
        //     leaderboard[currentQuiz][currentQuestion] = lead[i]["score"];
        //     leaderboard[currentUser]["totalScore"] += lead[i]["score"];
        //   }
        }
        /* For sorting, converting obj to array*/
        let entries = Object.entries(leaderboard);
        /* Sorting from high to low*/
        let sortAvgScore = entries.sort((a, b) => {
          return b[1].totalScore - a[1].totalScore
        })
        for (let i = 0; i < sortAvgScore.length; i++) {
          sortAvgScore[i].push({
            "Rank": i + 1
          })
        }
        res.json(leaderboard);
      }, (err) => next(err))
      .catch((err) => next(err));
  }

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
    objLanguage["C"] = proficiencyC+3;
    let proficiencyCPlusPlus = Math.floor((countLanguageCPlusPlus / countQuestions) * 100);
    objLanguage["C++"] = proficiencyCPlusPlus+3;
    let proficiencyJava = Math.floor((countLanguageJava / countQuestions) * 100);
    objLanguage["Java"] = proficiencyJava+3;
    let proficiencyJs = Math.floor((countLanguageJS / countQuestions) * 100);
    objLanguage["JavaScript"] = proficiencyJs+3+3;
    let proficiencyRuby = Math.floor((countLanguageRUBY / countQuestions) * 100);
    objLanguage["Ruby"] = proficiencyRuby+3;
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
    getallQuizDetails,
    showallQuizTopper,
    getleaderboardByAssessment,
    onequizDetails,
    langProficiencyWithTotalCount
}