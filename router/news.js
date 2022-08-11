const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/news');

router.get('/', NewsController.getNews);
router.post('/', NewsController.createNews);
router.put('/:id', NewsController.updateNews);
router.delete('/:id', NewsController.deleteNews);
router.get('/:id', NewsController.getDetailNews);

module.exports = router;
