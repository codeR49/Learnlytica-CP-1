require('dotenv').config();
const express = require('express');
var request = require("request");
var jwt = require('jsonwebtoken');

const Questions = require('../models/question');
const Reports = require('../models/report');

const submitRouter = express.Router();

var authenticate = require('../authenticate');

submitRouter.use(express.json());
let testInput = "";
let testOutput = [];
async function submit(req,res){
   
    let status;
    let evaluation;
    let languageUsed;
    let compileTime;
    let question;
    let user;
    let testcasePassed;
    let reportOBj={};
    let bearerToken;
    let  counter=0;

    let usertoken = req.headers.authorization;
    bearerToken = usertoken;
    //console.log(usertoken);
    let token = usertoken.split(' ');
    //console.log(token);
    let decoded = jwt.verify(token[1], process.env.SECRET_KEY);
    user = decoded._id;
    //console.log(user);
    let codeBody = [];
    req
      .on("data", chunk => {
        codeBody.push(chunk);
      })
      .on("end", () => {
        codeBody = Buffer.concat(codeBody).toString();
        bodyObj = JSON.parse(codeBody);
        //console.log(bodyObj);
        let code = bodyObj.code.toString();
        let language = bodyObj.language.toString();
        languageUsed = language.toUpperCase();
        
        let correctOutput = testOutput//"57";//'120 \n5040 \n';
      
        console.log(correctOutput);
  
        let inputs = testInput;//"2 \n 5 \n 7";//bodyObj.standardIn.toString();
  
        console.log(inputs);
        

        //ENV Variable
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
          async function (error, response, body) {
            console.log("error:", error);
            console.log("statusCode:", response && response.statusCode);
            console.log("body:", body);
            let count = 0;
            let output = body.output.match(/\d+/g);
            //console.log(output);
  
            compileTime = Math.floor(Number(body.cpuTime));
            compileTime = `${compileTime} sec`;
            //console.log(compileTime)
            for(let i =0; i<output.length; i++){
              if(output[i] == correctOutput[i]){
                  count += 1;
              }
            }
            body.output = `${count} out of ${output.length} test cases passed` 
  
            evaluation = (count/output.length) * 100;
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
  
              
            reportOBj.user = await user;
            reportOBj.question = await question;
            reportOBj.status = await status;
            reportOBj.languageUsed = await languageUsed;
            reportOBj.compileTime = await compileTime;
            reportOBj.testcasePassed = await testcasePassed;
          
            console.log(reportOBj);
           
            
           res.json(body);
           
          }
        )
   
   
  
    
    });

  
  
    if (reportOBj) {
  
      let report = Reports.create(reportOBj)
        .then((rept) => {
         console.log('Report created', rept);
        }, (err) => err)
       .catch((err)=> err);
  
       counter++
       
    } else {
      setTimeout(submitRouter.post("/"), 300); // try again in 300 milliseconds
      
    }
  


}


function getques(req,res)
{
    question = req.params.quesId;
    //console.log(question);
    Questions.findById(question)
    .then((ques) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        testInput = ques.sampleInput;
        testOutput = ques.sampleOutput;//.map(item => testOutput.push(item));
        console.log(testOutput);
        res.json(ques);
    }, (err) => next(err))
    .catch((err) => next(err));
}


module.exports={
    submit:submit,
    getques:getques
}