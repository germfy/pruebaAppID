'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport")
const AppIDStrategy = require("ibmcloud-appid").APIStrategy

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth/index')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
passport.use(new AppIDStrategy({
    oauthServerUrl: "https://us-south.appid.cloud.ibm.com/oauth/v4/407e2e0a-6c9a-42ea-b9f5-d95e09b4767d"
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

module.exports = app;