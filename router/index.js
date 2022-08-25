const express = require('express');
const router = express.Router();

const newsRouter = require('./news');
const articlesRouter = require('./articles');
const userRouter = require('./user');
const authenticationRouter = require('./authentication');
const postRouter = require('./post');

const checkIfAvailable = require('../middleware/isAvailable');
const authorization = require('../middleware/authorization');

router.use('/news',  newsRouter);
router.use('/posts', postRouter);
router.use('/articles',articlesRouter);
router.use('/user', authorization, userRouter);
router.use('/auth', authenticationRouter);

module.exports = router;
