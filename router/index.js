const express = require('express');
const router = express.Router();

const newsRouter = require('./news');
const articlesRouter = require('./articles');
const checkIfAvailable = require('../middleware/isAvailable');

router.use('/news', checkIfAvailable,  newsRouter);
router.use('/articles',articlesRouter)

module.exports = router;
