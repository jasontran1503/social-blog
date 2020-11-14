const multer = require('multer');

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error('Ảnh không đúng định dạng'), false);
  }
  cb(null, true);
};

const uploader = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // limiting files size to 1 MB
  },
});

module.exports = uploader;