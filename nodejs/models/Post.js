const mongoose = require('mongoose');
const slugify = require('slugify');
const moment = require('moment');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    slug: String,
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PostSchema.methods.generateSlug = function () {
  this.slug =
    slugify(this.title, { lower: true }) +
    '-' +
    moment().format('YYYYMMDDhhmmssSS');
  return this.save();
};

module.exports = mongoose.model('Post', PostSchema);
