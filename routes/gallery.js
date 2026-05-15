const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const isAdminOrModerator = require('../middleware/isAdminOrModerator');
const upload = require('../middleware/upload');
const galleryController = require('../controller/gallery');

// Galeri - herkese açık
router.get('/', galleryController.getGallery);

// Albüm oluştur - admin/moderator
router.post('/create', isAuth, isAdminOrModerator, galleryController.postCreateAlbum);

// Albüm sil - admin/moderator
router.get('/delete/:id', isAuth, isAdminOrModerator, galleryController.deleteAlbum);

// Fotoğraf ekle - admin/moderator
router.post('/photo/add/:albumId', isAuth, isAdminOrModerator, upload.single('photo_file'), galleryController.postAddPhoto);

// Fotoğraf sil - admin/moderator
router.get('/photo/delete/:id', isAuth, isAdminOrModerator, galleryController.deletePhoto);

module.exports = router;