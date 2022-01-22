require('dotenv').config();
const request = require("request");
const jwt = require('jsonwebtoken');
const Reports = require('../models/report');
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
let reportOBj = {};

const getPassTestCased = (authenticate.verifyUser, (req, res) => {
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
      languageUsed = language.toUpperCase();
      let correctOutput = testOutput//"57";//'120 \n5040 \n';
      console.log(correctOutput);
      let inputs = testInput;//"2 \n 5 \n 7";//bodyObj.standardIn.toString();
      console.log(inputs);
      var program = {
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
          compileTime = Math.floor(Number(body.cpuTime));
          compileTime = `${compileTime} sec`;

          for (let i = 0; i < output.length; i++) {
            if (output[i] == correctOutput[i]) {
              count += 1;
            }
          }
          body.output = `${count} out of ${output.length} test cases passed`
          evaluation = (count / output.length) * 100;
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

          reportOBj.user = user;
          reportOBj.question = question;
          reportOBj.status = status;
          reportOBj.languageUsed = languageUsed;
          reportOBj.compileTime = compileTime;
          reportOBj.testcasePassed = testcasePassed;
          console.log(reportOBj);

          res.json(body);

        }
      );
    });

  if (reportOBj) {
    let report = Reports.create(reportOBj)
      .then((rept) => {
        console.log('Report created', rept);
      }, (err) => err)
      .catch((err) => err);
  } else {
    setTimeout(submitRouter.post("/"), 300); // try again in 300 milliseconds
  }
})

module.exports = getPassTestCased;