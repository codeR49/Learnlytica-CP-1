const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportQuizSchema = new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    quizID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    status: {
        type: String,
        enum: ["Solved", "Partially Solved", "Unsolved"],
        required: true
    },
    languageUsed: {
        type: String,
        required: true
    },
    compileTime: {
        type: String,
        required: true
    },
    timeSpent: {
        type: String
    },
    testcasePassed: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
    
}, {
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
 },{
    timestamps: true
})

var  QuizReport = mongoose.model('Quizreport', reportQuizSchema);

module.exports =  QuizReport;