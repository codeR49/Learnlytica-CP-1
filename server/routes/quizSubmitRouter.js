require('dotenv').config();
const express = require('express');
var request = require("request");
var jwt = require('jsonwebtoken');

const Questions = require('../models/question');
const Reports = require('../models/report');

const quizReport = express.Router();

var authenticate = require('../authenticate');

quizReport.use(express.json());


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
let correctOutput;
let reportOBj={};
var program;
let score;
let demoReport = {
  user: '61cc0ef15c9f00cf9e2454ef',
  question: '61cae1643a71d187904a1970',
  status: 'Partially Solved',
  languageUsed: 'C',
  compileTime: '0 sec',
  testcasePassed: '50%'
}
// let reportJSON;
// let createReport;

quizReport.route('/')
.get((req,res,next) => {
    Reports.find({})
    .populate('user question')
    .then((rept) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rept);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
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
      let quesid=bodyObj.quesid.toString();
      languageUsed = language.toUpperCase();
      
      //"57";//'120 \n5040 \n';
    
      
      //"2 \n 5 \n 7";//bodyObj.standardIn.toString();
      



    
    
      setTimeout(() => { 

        Questions.findById(quesid)
        .then((ques) => {
            testInput = ques.sampleInput;
            testOutput = ques.sampleOutput;//.map(item => testOutput.push(item));
            correctOutput = testOutput
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
                let output =body.output.match(/\d+/g);  
                let size=output.length;  
      
      
                compileTime = Math.floor(Number(body.cpuTime));
                compileTime = `${compileTime} sec`;
        
    
    
                for(let i =0; i<size; i++){
                    
                  if(output[i] == correctOutput[i]){
                    count += 1;
                  }
                }
                  
                body.output = `${count} out of ${size} test cases passed` 
      
                evaluation = (count/size) * 100;
                console.log(evaluation);
                if(evaluation == 100){
                  status = "Solved";
                }
                else if(evaluation > 0 && evaluation < 100){
                  status = "Partially Solved";
                }
                else{
                  status = "Unsolved";
                }
                testcasePassed = `${evaluation}%`;
               
                //var delayInMilliseconds = 10000; //1 second
      
                reportOBj.quizID = "61d6a02eb1be8bb03c273efc"
                reportOBj.user = user;
                reportOBj.question = question;
                reportOBj.status =status;
                reportOBj.languageUsed = languageUsed;
                reportOBj.compileTime = compileTime;
                reportOBj.testcasePassed = testcasePassed;
                reportOBj.score = evaluation;
                //reportJSON = JSON.stringify(reportOBj);
                Reports.create(reportOBj)
                console.log(reportOBj);
                // createReport = Reports.create( reportJSON, function (err, rept) {
                //   if (err) return err;
                //   console.log('Report created', rept);
                // });
                
                
               res.json(body);
               
              } 
            );
            
            
            }, 2000);
           
        })
        
  
        

  
  });

}); 



module.exports = quizReport;