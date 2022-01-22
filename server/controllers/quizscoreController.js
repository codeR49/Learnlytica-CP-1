require('dotenv').config();
const request = require("request");
const jwt = require('jsonwebtoken');
const Questions = require('../models/question');
const QuizReports = require('../models/quizreport');
const Attempt = require('../models/attempt');
const authenticate = require('../middlewares/authenticate');
let testInput = "";
let testOutput = [];
let status;
let evaluation;
let languageUsed;
let compileTime;
let question;
let user;
let testcasePassed;
let inputs;
let reportOBj = {};
var program;

const getAllQuizScores = (req, res, next) => {
  QuizReports.find({})
    .populate('user question')
    .then((rept) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(rept);
    }, (err) => next(err))
    .catch((err) => next(err));
}

const createQuizReport = (authenticate.verifyUser, (req, res) => {
  let usertoken = req.headers.authorization;
  let token = usertoken.split(' ');
  let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
  user = decoded._id;
  let codeBody = [];
  req
    .on("data", chunk => {
      codeBody.push(chunk);
    })
    .on("end", () => {
      codeBody = Buffer.concat(codeBody).toString();
      bodyObj = JSON.parse(codeBody);
      let code = bodyObj.code.toString();
      let language = bodyObj.language.toString();
      let quesid = bodyObj.quesid.toString();
      question = quesid;
      console.log("quesid" + question);
      let quizid = bodyObj.quizid.toString();
      console.log("quizid" + quizid)
      languageUsed = language.toUpperCase();
      setTimeout(() => {
        Questions.findById(quesid)
          .then((ques) => {
            testInput = ques.sampleInput;
            testOutput = ques.sampleOutput;
            inputs = testInput;
            program = {
              script: code,
              language: language,
              stdin: inputs,
              versionIndex: "0",
              clientId: "1a06c1f835ba9b2ccf218d8fe381182d",
              clientSecret:
                "3762082933511c0ad39b8ba3908d45accbefaf946c38dd88161758185dc9dbec"
            };
            request(
              {
                url: "https://api.jdoodle.com/v1/execute",
                method: "POST",
                json: program
              },
              function (error, response, body) {
                console.log("error:", error);
                console.log("statusCode:", response && response.statusCode);
                console.log("body:", body);
                let count = 0;
                let output = body.output.match(/\d+/g);
                let size = output.length;
                compileTime = Math.floor(Number(body.cpuTime));
                compileTime = `${compileTime} sec`;
                for (let i = 0; i < size; i++) {
                  if (output[i] == testOutput[i]) {
                    count += 1;
                  }
                }
                body.output = `${count} out of ${size} test cases passed`
                evaluation = (count / size) * 100;
                let attempt = 0;
                console.log(evaluation);
                if (evaluation == 100) {
                  status = "Solved";
                }
                else if (evaluation > 0 && evaluation < 100) {
                  status = "Partially Solved";
                }
                else {
                  status = "Unsolved";
                }
                testcasePassed = `${evaluation}%`;

                reportOBj.quizID = quizid,
                  reportOBj.user = user;
                reportOBj.question = question;
                reportOBj.status = status;
                reportOBj.languageUsed = languageUsed;
                reportOBj.compileTime = compileTime;
                reportOBj.testcasePassed = testcasePassed;
                reportOBj.score = evaluation;

                body.score = evaluation;
                console.log(body.score);

                QuizReports.find({ user: user, question: question, quizID: quizid })
                  .then((res) => {
                    if (res.length > 0) {
                      console.log("find 1 func");
                      console.log(res);
                      let dbscore = res.score;
                      if (dbscore > evaluation) {
                        reportOBj.score = dbscore;
                        QuizReports.findByIdAndUpdate({ user: user, question: question, quizID: quizid }, {
                          $set: { 'score': reportOBj.score }
                        }, { new: true })
                        console.log("Updated");
                      }
                    }
                    else {
                      QuizReports.create(reportOBj)
                      console.log("Created");
                    }
                  })
                console.log(reportOBj);
                res.json(body);
              }
            );
          }, 2000);
      })
    });
})

const getUserAvgScore = (authenticate.verifyUser, (req, res, next) => {
  let usertoken = req.headers.authorization;
  let token = usertoken.split(' ');
  let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
  let userid = decoded._id;
  QuizReports.find({ user: userid, quizID: "61d6a02eb1be8bb03c273efc" })
    .then((getScore) => {
      let avgscore = 0;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      for (let i = 0; i < getScore.length; i++) {
        avgscore += getScore[i]["score"];
        console.log(avgscore);
      }
      res.json({ "AvgScore": avgscore });
    }, (err) => next(err))
    .catch((err) => next(err));
  let b = {
    quizID: "61d6a02eb1be8bb03c273efc",
    userID: userid,
    attemptFlag: true,
    attemptAllowed: 3
  }

  Attempt.find({ userID: userid, quizID: "61d6a02eb1be8bb03c273efc" })
    .then((res) => {

      if (res.length > 0) {
        console.log("find 1 func");
        console.log(res);
        console.log(res[0].attemptAllowed)
        let remaining = res[0].attemptAllowed
        if (remaining > 0) {
          remaining = remaining - 1;
          console.log(remaining)
          Attempt.updateOne({ userID: userid, quizID: "61d6a02eb1be8bb03c273efc" }, {
            $set: { 'attemptAllowed': remaining }
          }, { new: true }).then(console.log("sachin"))

          console.log("Updated");
        }
      }
      else {
        Attempt.create(b)
        console.log("Attempted");
      }
    })
})

const showjavaleaderboard = (req, res, next) => {
  QuizReports.find({ quizID: req.params.quizid })
    .populate('user question')
    .then((lead) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      /* loop for no of users in this quiz */
      let leaderboard = {};
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
      })
      for (let i = 0; i < sortAvgScore.length; i++) {
        sortAvgScore[i].push({
          "Rank": i + 1
        })
      }
      res.json(sortAvgScore);
    }, (err) => next(err))
    .catch((err) => next(err));
}

module.exports = {
  getAllQuizScores,
  createQuizReport,
  getUserAvgScore,
  showjavaleaderboard
};