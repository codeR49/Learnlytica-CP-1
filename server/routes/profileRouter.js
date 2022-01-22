const express = require('express');
const profileRouter = express.Router();
const authenticate = require('../middlewares/authenticate');
const profileController = require("../controllers/profileController");
profileRouter.use(express.json());

profileRouter.get('/', authenticate.verifyUser, profileController.displayProfile);

module.exports = profileRouter;