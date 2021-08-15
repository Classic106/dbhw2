const express = require('express');
const passport = require('passport');

const adminPassport = require('../passports/adminPassport');

passport.use('admin', adminPassport);

const { 
    getAll,
    postReg,
    postLog
} = require('./controller');

const userRouter = express.Router();

userRouter.get('/', passport.authenticate('admin', {session: false}), getAll);
userRouter.post('/reg', postReg);
userRouter.post('/log', postLog);

module.exports = userRouter;
