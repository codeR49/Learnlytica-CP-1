const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const authenticate = require('../middlewares/authenticate');
const userController = require("../controllers/userController");
userRouter.use(express.json());

/* GET users listing. */
userRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, userController.getAllUsers);
/* Register user */
userRouter.post('/signup', userController.registerUser);
/* Login user */
userRouter.post('/login', passport.authenticate('local'), userController.loginUser);
/* Edit user details*/
userRouter.put('/edit/:userId', authenticate.verifyUser, userController.editUser);

module.exports = userRouter;