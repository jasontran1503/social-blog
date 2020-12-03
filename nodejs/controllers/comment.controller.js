const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = {
  /**
   * Create comment
   * @route POST api/comment/create
   * @body content, slug
   */
  createComment: async (req, res, next) => {
    const { content, slug } = req.body;
    req.body.user = req.user._id;

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const post = await Post.findOne({ slug });
      if (post) {
        const comment = new Comment(req.body);
        comment.post = post;
        await comment.save();
        post.comments.push(comment);
        await post.save();

        return res.status(200).json({
          success: true,
          message: 'Thêm thành công',
        });
      } else {
        throw new Error('Không tìm thấy post');
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update comment
   * @route PUT api/comment/update
   * @body content
   * @queryParams commentId
   */
  updateComment: async (req, res, next) => {
    const { content } = req.body;
    const { commentId } = req.query;
    req.body.user = req.user._id;

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const comment = await Comment.findById(commentId);
      if (comment) {
        if (comment.user.equals(user._id) || user.role === 'admin') {
          const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            success: true,
            message: 'Cập nhật thành công',
            data: updatedComment,
          });
        } else {
          throw new Error('Cập nhật thất bại');
        }
      } else {
        throw new Error('Không tìm thấy comment');
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete comment
   * @route DELETE api/comment/delete
   * @queryParams commentId
   */
  deleteComment: async (req, res, next) => {
    const { commentId } = req.query;
    req.body.user = req.user._id;

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error('Không tìm thấy user');
      }
      const comment = await Comment.findById(commentId).populate(
        'post',
        'user'
      );
      if (!comment) {
        throw new Error('Không tìm thấy comment');
      }
      console.log(comment);
      const post = await Post.findById(comment.post._id);
      if (!post) {
        throw Error('Không tìm thấy bài viết');
      }
      if (comment.user.equals(user._id) || comment.post.user.equals(user._id)) {
        const commentDeleted = await Comment.deleteOne({ _id: commentId });
        // Remove comment id in post's comments array
        if (post.comments.includes(commentId)) {
          await post.updateOne({ $pull: { comments: commentId } });
        }
        return res.status(200).json({
          success: true,
          message: 'Xóa thành công',
        });
      } else {
        throw new Error('Xóa thất bại');
      }
    } catch (error) {
      next(error);
    }
  },
};
