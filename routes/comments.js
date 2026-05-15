const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdminOrModerator = require('../middleware/isAdminOrModerator');
const commentController = require('../controller/comment');

// Yorum ekle
router.post('/add/:discussionId', isAuth, commentController.postComment);

// Yorum sil - admin/moderator
router.get('/delete/:id', isAuth, isAdminOrModerator, commentController.deleteComment);

// Yoruma oy ver
router.post('/vote/:id', isAuth, commentController.voteComment);

module.exports = router;