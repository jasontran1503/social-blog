const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = {
	/**
	 * Create post
	 * @route POST api/post/create
	 * @body title, content
	 */
	createPost: async (req, res, next) => {
		const { title, content } = req.body;
		req.body.user = req.user._id;

		try {
			const user = await User.findById(req.user._id);

			if (user) {
				const newPost = await Post.create(req.body);
				newPost.generateSlug();

				return res.status(200).json({
					success: true,
					message: 'Thêm thành công',
					data: newPost,
				});
			} else {
				throw new Error('Không tìm thấy user');
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Get all post
	 * @route GET api/post
	 * @queryParams page, size
	 */
	getAllPost: async (req, res, next) => {
		const size = parseInt(req.query.size, 10) || 5;
		const page = parseInt(req.query.page, 10) || 1;
		const skip = (page - 1) * size;

		try {
			const postsCount = await Post.find({}).countDocuments();
			const posts = await Post.find({})
				.populate('user', 'username avatar')
				.lean()
				.skip(skip)
				.limit(size)
				.sort({ createdAt: -1 });
			if (posts.length > 0) {
				return res.status(200).json({
					success: true,
					message: 'Thành công',
					data: { posts, postsCount },
				});
			} else {
				return res.status(200).json({
					success: true,
					message: 'Không có dữ liệu!',
					data: [],
				});
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Get post by user
	 * @route GET api/post/user
	 * @queryParams page, size, username
	 */
	getPostByUser: async (req, res, next) => {
		const username = req.query.username;
		const size = parseInt(req.query.size, 10) || 5;
		const page = parseInt(req.query.page, 10) || 1;
		const skip = (page - 1) * size;

		try {
			const user = await User.findOne({ username });
			if (user) {
				const postsCount = await Post.find({ user: user._id }).countDocuments();
				const posts = await Post.find({ user: user._id })
					.populate('user', 'username avatar')
					.lean()
					.skip(skip)
					.limit(size)
					.sort({ createdAt: -1 });
				if (postsCount > 0) {
					return res.status(200).json({
						success: true,
						message: 'Thành công',
						data: { posts, postsCount },
					});
				} else {
					return res.status(200).json({
						success: true,
						message: 'Không có dữ liệu!',
						data: [],
					});
				}
			} else {
				throw new Error('Không tìm thấy user');
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Get post detail
	 * @route GET api/post/detail
	 * @queryParams slug
	 */
	getPostDetail: async (req, res, next) => {
		const slug = req.query.slug;
		try {
			const post = await Post.findOne({ slug })
				.populate('user', 'username avatar')
				.populate({
					path: 'comments',
					populate: [
						{ path: 'user', select: ['username', 'avatar'] },
						{
							path: 'post',
							select: ['user'],
							populate: { path: 'user', select: ['username'] },
						},
					],
					options: { sort: { createdAt: -1 } },
				})
				.lean();

			if (post) {
				return res.status(200).json({
					success: true,
					message: 'Thành công',
					data: post,
				});
			} else {
				throw new Error('Không tìm thấy post');
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Update post
	 * @route PUT api/post/update
	 * @body title, content
	 * @queryParams slug
	 */
	updatePost: async (req, res, next) => {
		const { title, content } = req.body;
		const slug = req.query.slug;

		try {
			const post = await Post.findOne({ slug });
			const user = await User.findById(req.user._id);

			if (!user) {
				throw new Error('Không tìm thấy user');
			}
			if (!post) {
				throw new Error('Không tìm thấy post');
			}
			if (post.user.equals(user._id) || user.role === 'admin') {
				const updatedPost = await Post.findOneAndUpdate({ slug }, req.body, {
					new: true,
					runValidators: true,
				});
				if (updatedPost) {
					return res.status(200).json({
						success: true,
						message: 'Cập nhật thành công',
						data: updatedPost,
					});
				}
			} else {
				throw new Error('Cập nhật thất bại');
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Delete post
	 * @route DELETE api/post/delete
	 * @queryParams slug
	 */
	deletePost: async (req, res, next) => {
		const slug = req.query.slug;

		try {
			const post = await Post.findOne({ slug });
			const user = await User.findOne(req.user._id);

			if (!user) {
				throw new Error('Không tìm thấy user');
			}
			if (!post) {
				throw new Error('Không tìm thấy post');
			}
			if (post.user.equals(user._id) || user.role === 'admin') {
				const postDeleted = await Post.findOneAndDelete({ slug });
				if (postDeleted) {
					const comments = postDeleted.comments;
					if (comments.length > 0) {
						const result = await Comment.deleteMany({ _id: { $in: comments } });
					}
					return res.status(200).json({
						success: true,
						message: 'Xóa thành công',
					});
				}
			} else {
				throw new Error('Xóa thất bại');
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Favorite post
	 * @route POST api/post/favorite
	 * @body slug
	 */
	favorite: async (req, res, next) => {
		const slug = req.body.slug;

		try {
			const post = await Post.findOne({ slug });
			const user = await User.findOne(req.user._id);

			if (!user) {
				throw new Error('Không tìm thấy user');
			}
			if (!post) {
				throw new Error('Không tìm thấy post');
			}
			if (!post.favorites.includes(req.user._id)) {
				await post.updateOne({ $push: { favorites: req.user._id } });
			} else {
				throw new Error('Thất bại');
			}
			return res.status(200).json({
				success: true,
				message: 'Thành công',
			});
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Unfavorite post
	 * @route POST api/post/unfavorite
	 * @body slug
	 */
	unfavorite: async (req, res, next) => {
		const slug = req.body.slug;

		try {
			const post = await Post.findOne({ slug });
			const user = await User.findOne(req.user._id);

			if (!user) {
				throw new Error('Không tìm thấy user');
			}
			if (!post) {
				throw new Error('Không tìm thấy post');
			}
			if (post.favorites.includes(req.user._id)) {
				await post.updateOne({ $pull: { favorites: req.user._id } });
			} else {
				throw new Error('Thất bại');
			}
			return res.status(200).json({
				success: true,
				message: 'Thành công',
			});
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Get list favorite post
	 * @route GET api/post/favorites
	 * @queryParams slug
	 */
	getListFavorite: async (req, res, next) => {
		const slug = req.query.slug;

		try {
			const post = await Post.findOne({ slug }).populate({
				path: 'favorites',
				select: ['username', 'avatar'],
			});
			if (!post) {
				throw new Error('Không tìm thấy post');
			}
			return res.status(200).json({
				success: true,
				message: 'Thành công',
				data: post.favorites,
			});
		} catch (error) {
			next(error);
		}
	},
};
