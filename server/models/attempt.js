const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attemptSchema = new Schema({
    quizID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
    attemptFlag: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    attemptAllowed: {
        type: Number
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
})

let Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;