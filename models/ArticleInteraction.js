const mongoose = require('mongoose');

const articleInteractionSchema = new mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: String }]  // Array of usernames who upvoted
}, { timestamps: true });

module.exports = mongoose.model('ArticleInteraction', articleInteractionSchema);
