const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const isAdminOrModerator = require('../middleware/isAdminOrModerator');
const announcementController = require('../controller/announcement');
const userController = require('../controller/user');

// Admin dashboard - sadece admin
router.get('/', isAuth, isAdminOrModerator, announcementController.dashboard);

// Duyuru listesi - admin ve moderator
router.get('/list/anc', isAuth, isAdminOrModerator, announcementController.listAnc);

// Duyuru ekle - admin ve moderator
router.get('/add/anc', isAuth, isAdminOrModerator, announcementController.getAddAnc);
router.post('/add/anc', isAuth, isAdminOrModerator, announcementController.postAddAnc);

// Duyuru düzenle - admin ve moderator
router.get('/edit/anc/:id', isAuth, isAdminOrModerator, announcementController.getEditAnc);
router.post('/edit/anc/:id', isAuth, isAdminOrModerator, announcementController.postEditAnc);

// Duyuru sil - sadece admin
router.get('/delete/anc/:id', isAuth, isAdmin, announcementController.deleteAnc);

router.get('/pin/anc/:id', isAuth, isAdminOrModerator, announcementController.togglePin);

router.post('/user/role/:id', isAuth, isAdmin, userController.updateRole);

module.exports = router;