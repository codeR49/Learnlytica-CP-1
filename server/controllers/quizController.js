const Quiz = require('../models/question');

function createQuiz(req, res){
    Quiz.create(req.body)
    .then((ques) => {
        console.log('Question created', ques);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(ques)
    }, (err) => err)
   .catch((err)=> (err))

}


module.exports = {
    createQuiz: createQuiz
} 