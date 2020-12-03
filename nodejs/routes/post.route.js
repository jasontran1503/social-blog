const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const postController = require('../controllers/post.controller');
const validator = require('../helpers/validator');

router.get('/', postController.getAllPost);
router.get('/user', postController.getPostByUser);
router.get('/detail', postController.getPostDetail);
router.post(
  '/create',
  auth.guard,
  validator.post,
  validator.handleValidationErrors,
  postController.createPost
);
router.put(
  '/update',
  auth.guard,
  validator.post,
  validator.handleValidationErrors,
  postController.updatePost
);
router.delete('/delete', auth.guard, postController.deletePost);
router.post('/favorite', auth.guard, postController.favorite);
router.post('/unfavorite', auth.guard, postController.unfavorite);
router.get('/favorites', postController.getListFavorite);

module.exports = router;
