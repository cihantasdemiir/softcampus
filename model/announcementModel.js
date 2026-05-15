const db = require('./db');
const slugify = require('slugify');

// Tüm duyuruları getir
exports.getAll = async () => {
    const result = await db.query(
        'SELECT * FROM announcements ORDER BY is_pinned DESC, created_at DESC'
    );
    return result.rows;
};

// ID ile getir - admin edit/delete için
exports.getById = async (id) => {
    const result = await db.query('SELECT * FROM announcements WHERE id = $1', [id]);
    return result.rows[0];
};

// Slug ile getir - detay sayfası için
exports.getBySlug = async (slug) => {
    const result = await db.query('SELECT * FROM announcements WHERE slug = $1', [slug]);
    return result.rows[0];
};

// Yeni duyuru ekle
exports.create = async (title, content, category, is_active) => {
    // Başlıktan slug üret: boşlukları tire yap, Türkçe karakterleri temizle
    const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: 'tr'
    });

    await db.query(
        'INSERT INTO announcements (title, content, slug, category, is_active) VALUES ($1, $2, $3, $4, $5)',
        [title, content, slug, category, is_active]
    );
};

// Duyuru güncelle
exports.update = async (id, title, content, category, is_active) => {
    await db.query(
        'UPDATE announcements SET title=$1, content=$2, category=$3, is_active=$4 WHERE id=$5',
        [title, content, category, is_active, id]
    );
};

// Duyuru sil
exports.delete = async (id) => {
    await db.query('DELETE FROM announcements WHERE id = $1', [id]);
};

// Duyuruyu sabitle/kaldır
exports.togglePin = async (id, pinned) => {
    await db.query('UPDATE announcements SET is_pinned = $1 WHERE id = $2', [pinned, id]);
};