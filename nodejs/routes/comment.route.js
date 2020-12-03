const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const commentController = require('../controllers/comment.controller');
const validator = require('../helpers/validator');

router.post(
  '/create',
  auth.guard,
  validator.comment,
  validator.handleValidationErrors,
  commentController.createComment
);
router.put(
  '/update',
  auth.guard,
  validator.comment,
  validator.handleValidationErrors,
  commentController.updateComment
);
router.delete(
  '/delete',
  auth.guard,
  validator.comment,
  commentController.deleteComment
);

module.exports = router;
