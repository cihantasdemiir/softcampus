const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdminOrModerator = require('../middleware/isAdminOrModerator');
const discussionController = require('../controller/discussion');

// Tartışma listesi - herkese açık
router.get('/', discussionController.listDiscussions);

// Tartışma oluştur - giriş yapmış kullanıcılar
router.get('/create', isAuth, discussionController.getCreate);
router.post('/create', isAuth, discussionController.postCreate);

// Tartışma sil - admin ve moderator
router.get('/delete/:id', isAuth, isAdminOrModerator, discussionController.deleteDiscussion);

// Tartışma detay - herkese açık (slug ile)
router.get('/:slug', discussionController.getDetail);

//Pinleme
router.get('/pin/:id', isAuth, isAdminOrModerator, discussionController.togglePin);

//Oy verme
router.post('/vote/:id', isAuth, discussionController.vote);

module.exports = router;