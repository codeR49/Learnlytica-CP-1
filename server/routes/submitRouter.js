const express = require('express');
const submitRouter = express.Router();
const submitController = require("../controllers/submitController")
submitRouter.use(express.json());

/* Route to submit to show no of test cased pass*/
submitRouter.post("/", submitController);

module.exports = submitRouter;