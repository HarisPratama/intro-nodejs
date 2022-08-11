const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articles');

router.get('/', ArticleController.getArticles);
router.post('/', ArticleController.createArticle);
router.get('/:id', ArticleController.getArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

module.exports = router
