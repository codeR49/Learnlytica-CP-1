const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Question = require('./question');

const quizSchema = new Schema({
    quizName: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: Array
    },
    time: {
        type: Number,
        required: true
    }

},  {
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }
 },{
    timestamps: true
})

quizSchema.pre('save', async function(next){
    const questionPromise = this.question.map(async id => await Question.findById(id));
    this.question = await Promise.all(questionPromise);
    next();
})


var  Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;