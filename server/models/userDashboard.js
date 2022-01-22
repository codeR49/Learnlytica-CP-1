const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalProblemSolved: {
        type: Number
    },
    avgAssessmentScore: {
        type: String
    },
    totalProjects: {
        type: String
    },
    openSource: {
        noOfContribution: Number,
        timePeriod: String
    },
    testCaseEfficiency: {
        challenges: String,
        assessment: String,
        projects: String
    },
    overallRating: {
        developerCapability: String,
        learningHours: String
    },
    languageProficiency: {
        type: Array
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
})

var UserDashboard = mongoose.model('UserDashboard', dashboardSchema);

module.exports = UserDashboard;