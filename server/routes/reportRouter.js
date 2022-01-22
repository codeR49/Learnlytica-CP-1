const express = require('express');
const reportRouter = express.Router();
const reportController = require('../controllers/reportController');
reportRouter.use(express.json());

reportRouter.route('/')
    .get(reportController.getAllReports)//route to get all user reports
    .post(reportController.createReports)//route to create user report
    .delete(reportController.deleteAllReport);//route to delete all user reports

reportRouter.route('/:respId')
    .get(reportController.getReportById)//route to get user report by id
    .put(reportController.updateReportById)//route to update user report by id
    .delete(reportController.deleteReportById);//route to delete user report by id

module.exports = reportRouter;