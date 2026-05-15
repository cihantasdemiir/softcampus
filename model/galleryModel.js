const db = require('./db');

// Tüm albümleri getir
exports.getAll = async () => {
    const result = await db.query(
        'SELECT ga.*, u.fullname FROM gallery_albums ga LEFT JOIN users u ON ga.created_by = u.id ORDER BY ga.created_at DESC'
    );
    return result.rows;
};

// ID ile albüm getir
exports.getById = async (id) => {
    const result = await db.query(
        'SELECT ga.*, u.fullname FROM gallery_albums ga LEFT JOIN users u ON ga.created_by = u.id WHERE ga.id = $1',
        [id]
    );
    return result.rows[0];
};

// Albüm oluştur
exports.createAlbum = async (title, cover_url, created_by) => {
    const result = await db.query(
        'INSERT INTO gallery_albums (title, cover_url, created_by) VALUES ($1, $2, $3) RETURNING id',
        [title, cover_url, created_by]
    );
    return result.rows[0];
};

// Albüm sil
exports.deleteAlbum = async (id) => {
    await db.query('DELETE FROM gallery_albums WHERE id = $1', [id]);
};

// Albüme fotoğraf ekle
exports.addPhoto = async (album_id, photo_url, caption) => {
    await db.query(
        'INSERT INTO gallery_photos (album_id, photo_url, caption) VALUES ($1, $2, $3)',
        [album_id, photo_url, caption]
    );
};

// Albümün fotoğraflarını getir
exports.getPhotos = async (album_id) => {
    const result = await db.query(
        'SELECT * FROM gallery_photos WHERE album_id = $1 ORDER BY created_at ASC',
        [album_id]
    );
    return result.rows;
};

// Fotoğraf sil
exports.deletePhoto = async (id) => {
    await db.query('DELETE FROM gallery_photos WHERE id = $1', [id]);
};