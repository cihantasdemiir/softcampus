const galleryModel = require('../model/galleryModel');

// Galeri ana sayfası
exports.getGallery = async (req, res) => {
    const albums = await galleryModel.getAll();

    // Her albümün fotoğraflarını da getir
    const albumsWithPhotos = await Promise.all(
        albums.map(async (album) => {
            const photos = await galleryModel.getPhotos(album.id);
            return { ...album, photos };
        })
    );

    res.render('gallery', {
        pageTitle: 'Galeri',
        session: req.session,
        albums: albumsWithPhotos
    });
};

// Albüm oluştur
exports.postCreateAlbum = async (req, res) => {
    const { title, cover_url } = req.body;
    const created_by = req.session.userId;
    await galleryModel.createAlbum(title, cover_url, created_by);
    res.redirect('/gallery');
};

// Albüm sil
exports.deleteAlbum = async (req, res) => {
    await galleryModel.deleteAlbum(req.params.id);
    res.redirect('/gallery');
};

// Fotoğraf ekle
// Fotoğraf ekle - dosya yükleme
exports.postAddPhoto = async (req, res) => {
    let photo_url;

    // Dosya yüklendiyse path'i kullan, URL girdiyse onu kullan
    if (req.file) {
        photo_url = '/uploads/' + req.file.filename;
    } else if (req.body.photo_url) {
        photo_url = req.body.photo_url;
    } else {
        return res.redirect('/gallery');
    }

    const { caption } = req.body;
    await galleryModel.addPhoto(req.params.albumId, photo_url, caption);
    res.redirect('/gallery');
};

// Fotoğraf sil
exports.deletePhoto = async (req, res) => {
    await galleryModel.deletePhoto(req.params.id);
    res.redirect('/gallery');
};