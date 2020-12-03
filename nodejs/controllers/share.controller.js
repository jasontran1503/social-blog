const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

module.exports = {
  /**
   * Upload image to cloud
   * @route POST api/share/upload
   * @formData image
   * @queryParams folder
   */
  uploadImageToCloudinary: async (req, res, next) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    const folder = req.query.folder;
    const currentUser = await User.findById(req.user._id);
    try {
      if (!currentUser) {
        throw new Error('Không tìm thấy user');
      }
      if (!req.file) {
        throw new Error('Không có ảnh được chọn');
      }
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder,
      });
      fs.unlinkSync(req.file.path);
      if (folder === 'avatar') {
        await currentUser.updateOne({ avatar: uploadResult.url });
        return res.status(200).json({
          success: true,
          message: 'Đổi avatar thành công',
          data: uploadResult.url,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Upload thành công!',
        data: uploadResult.url,
      });
    } catch (error) {
      next(error);
    }
  },
};
