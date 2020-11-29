const User = require('../models/User');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports = {
    /**
     * Get user profile
     * @route GET api/user/profile
     * @queryParams username
     */
    getUserProfile: async (req, res, next) => {
        const username = req.query.username;

        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(200).json({
                    success: true,
                    message: 'Thành công',
                    data: user
                });
            } else {
                throw new Error('Không tìm thấy user');
            }
        } catch (error) {
            next(error);
        }
    },

    /**
     * Follow user
     * @route POST api/user/follow
     * @body username
     */
    follow: async (req, res, next) => {
        const username = req.body.username;
        req.body.user = req.user._id;

        try {
            const userFollow = await User.findOne({ username });
            const currentUser = await User.findById(req.body.user);
            if (!userFollow) {
                throw new Error('Không tìm thấy user ' + username);
            }
            if (!currentUser) {
                throw new Error('Không tìm thấy user');
            }
            if (userFollow.username === currentUser.username) {
                throw new Error('Có lỗi xảy ra');
            }

            if (!currentUser.following.includes(userFollow._id)) {
                await currentUser.updateOne(
                    { $push: { following: userFollow._id } }
                )
            } else {
                throw new Error('Follow thất bại');
            }
            if (!userFollow.followers.includes(req.body.user)) {
                await userFollow.updateOne(
                    { $push: { followers: req.body.user } }
                )
            } else {
                throw new Error('Follow thất bại');
            }
            return res.status(200).json({
                success: true,
                message: 'Follow thành công',
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Unfollow user
     * @route POST api/user/unfollow
     * @body username
     */
    unfollow: async (req, res, next) => {
        const username = req.body.username;
        req.body.user = req.user._id;

        try {
            const userFollowed = await User.findOne({ username });
            const currentUser = await User.findById(req.body.user);
            if (!userFollowed) {
                throw new Error('Không tìm thấy user ' + username);
            }
            if (!currentUser) {
                throw new Error('Không tìm thấy user');
            }
            if (userFollowed.username === currentUser.username) {
                throw new Error('Có lỗi xảy ra');
            }
            if (currentUser.following.includes(userFollowed._id)) {
                await currentUser.updateOne(
                    { $pull: { following: userFollowed._id } }
                )
            } else {
                throw new Error('Unfollow thất bại');
            }
            if (userFollowed.followers.includes(req.body.user)) {
                await userFollowed.updateOne(
                    { $pull: { followers: req.body.user } }
                )
            } else {
                throw new Error('Unfollow thất bại');
            }
            return res.status(200).json({
                success: true,
                message: 'Unfollow thành công',
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get user follower list
     * @route GET api/user/followers
     * @queryParams username
     */
    getUserFollowerList: async (req, res, next) => {
        const username = req.query.username;

        try {
            const user = await User.findOne({ username })
                .populate({
                    path: 'followers',
                    select: ['username', 'avatar']
                });
            if (user) {
                return res.status(200).json({
                    success: true,
                    message: 'Thành công',
                    data: user.followers
                });
            } else {
                throw new Error('Không tìm thấy user');
            }
        } catch (error) {
            next(error);
        }
    },

    /**
     * Get user following list
     * @route GET api/user/following
     * @queryParams username
     */
    getUserFollowingList: async (req, res, next) => {
        const username = req.query.username;

        try {
            const user = await User.findOne({ username })
                .populate({
                    path: 'following',
                    select: ['username', 'avatar']
                });
            if (user) {
                return res.status(200).json({
                    success: true,
                    message: 'Thành công',
                    data: user.following
                });
            } else {
                throw new Error('Không tìm thấy user');
            }
        } catch (error) {
            next(error);
        }
    },

    /**
     * Upload avatar
     * @route POST api/user/upload
     * @formData avatar
     */
    uploadAvatar: async (req, res, next) => {
        const storage = new Storage({
            projectId: process.env.GCLOUD_PROJECT_ID,
            keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
        });
        const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);
        const currentUser = await User.findById(req.user._id);
        try {
            if (!currentUser) {
                throw new Error('Không tìm thấy user');
            }
            if (!req.file) {
                throw new Error('Không có ảnh được chọn');
            }
            const blob = bucket.file(Date.now() + '-' + req.file.originalname);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: uuidv4()
                    }
                }
            });

            blobWriter.on('error', (err) => next(err));

            blobWriter.on('finish', async () => {
                const avatarUrl = await blob.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                });
                await currentUser.updateOne({ avatar: avatarUrl[0] });
                return res.status(200).json({
                    success: true,
                    message: 'Thành công',
                    data: avatarUrl[0]
                });
            });
            blobWriter.end(req.file.buffer);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Upload image to cloud
     * @route POST api/user/upload-to-cloud
     * @formData avatar
     */
    uploadImageToCloudinary: async (req, res, next) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });
        const currentUser = await User.findById(req.user._id);
        try {
            if (!currentUser) {
                throw new Error('Không tìm thấy user');
            }
            if (!req.file) {
                throw new Error('Không có ảnh được chọn');
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'images' });
            fs.unlinkSync(req.file.path);
            await currentUser.updateOne({ avatar: uploadResult.url });
            return res.status(200).json({
                success: true,
                message: 'Upload thành công!',
                data: uploadResult.url
            });
        } catch (error) {
            next(error);
        }

    }
};
