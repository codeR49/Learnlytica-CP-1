const Reports = require('../models/report');

const getAllReports = (req, res, next) => {
    Reports.find({})
        .populate('user question')
        .then((rept) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rept);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const createReports = (req, res, next) => {
    Reports.create(req.body)
        .then((rept) => {
            console.log('Report created', rept);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(rept)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const deleteAllReport = (req, res, next) => {
    Reports.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getReportById = (req, res, next) => {
    Reports.findById(req.params.respId)
        .then((rept) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rept);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateReportById = (req, res, next) => {
    Reports.findByIdAndUpdate(req.params.respId, {
        $set: req.body
    }, { new: true })
        .then((rept) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rept);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteReportById = (req, res, next) => {
    Reports.findByIdAndRemove(req.params.respId)
        .then((rept) => {
            res.setHeader('Content-Type', 'application/json');
            res.send("Deleted successfully")
            res.json(rept);
        }, (err) => next(err))
        .catch((err) => next(err))
}

module.exports = {
    getAllReports,
    createReports,
    deleteAllReport,
    getReportById,
    updateReportById,
    deleteReportById
}