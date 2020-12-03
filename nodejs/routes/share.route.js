const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const shareController = require('../controllers/share.controller');
const uploader = require('../helpers/upload');

router.post(
  '/upload',
  auth.guard,
  uploader.single('image'),
  shareController.uploadImageToCloudinary
);

module.exports = router;
