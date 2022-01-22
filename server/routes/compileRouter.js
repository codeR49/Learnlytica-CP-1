const express = require('express');
const compileRouter = express.Router();
const authenticate = require('../middlewares/authenticate');
const compileController = require("../controllers/compileController")
compileRouter.use(express.json());

compileRouter.post("/", authenticate.verifyUser, compileController.codeCompile);

module.exports = compileRouter;