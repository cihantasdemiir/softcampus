const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announcement');

// /announcements/:slug → detay sayfası
router.get('/:slug', announcementController.getDetail);

module.exports = router;