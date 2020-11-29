const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const userController = require('../controllers/user.controller');
const uploader = require('../helpers/upload');

router.get('/profile', userController.getUserProfile);
router.post('/follow', auth.guard, userController.follow);
router.post('/unfollow', auth.guard, userController.unfollow);
router.get('/followers', auth.guard, userController.getUserFollowerList);
router.get('/following', auth.guard, userController.getUserFollowingList);
router.post('/upload', auth.guard, uploader.single('avatar'), userController.uploadAvatar);
router.post('/upload-to-cloud', auth.guard, uploader.single('avatar'), userController.uploadImageToCloudinary);

module.exports = router;
