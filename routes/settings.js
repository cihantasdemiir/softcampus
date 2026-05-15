const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const settingsController = require('../controller/settings');

router.get('/', isAuth, settingsController.getSettings);
router.post('/change-password', isAuth, settingsController.postChangePassword);

module.exports = router;