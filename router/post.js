const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');

router.get('/', PostController.getPosts);
router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.get('/:id', PostController.getDetailPost);

module.exports = router;
