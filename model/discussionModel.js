const db = require('./db');
const slugify = require('slugify');

// Tüm tartışmaları getir
exports.getAll = async (category = null) => {
    const query = `
        SELECT d.*, u.fullname,
        COUNT(c.id) AS comment_count
        FROM discussions d
        LEFT JOIN users u ON d.user_id = u.id
        LEFT JOIN comments c ON c.discussion_id = d.id
        ${category ? 'WHERE d.category = $1' : ''}
        GROUP BY d.id, u.fullname
        ORDER BY d.is_pinned DESC, d.likes DESC, d.created_at DESC
    `;
    const result = category
        ? await db.query(query, [category])
        : await db.query(query);
    return result.rows;
};

// ID ile tartışma getir
exports.getById = async (id) => {
    const result = await db.query(
        'SELECT d.*, u.fullname FROM discussions d LEFT JOIN users u ON d.user_id = u.id WHERE d.id = $1',
        [id]
    );
    return result.rows[0];
};

// Slug ile tartışma getir
exports.getBySlug = async (slug) => {
    const result = await db.query(
        'SELECT d.*, u.fullname FROM discussions d LEFT JOIN users u ON d.user_id = u.id WHERE d.slug = $1',
        [slug]
    );
    return result.rows[0];
};

// Yeni tartışma oluştur
exports.create = async (title, content, category, is_anonymous, user_id) => {
    // Slug oluştur
    const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: 'tr'
    });

    const result = await db.query(
        'INSERT INTO discussions (title, content, category, is_anonymous, user_id, slug) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [title, content, category, is_anonymous, user_id, slug]
    );
    return result.rows[0];
};

// Görüntülenme sayısını artır
exports.incrementViews = async (id) => {
    await db.query('UPDATE discussions SET views = views + 1 WHERE id = $1', [id]);
};

// Tartışma sil
exports.delete = async (id) => {
    await db.query('DELETE FROM discussions WHERE id = $1', [id]);
};

// Tartışmayı sabitle/kaldır
exports.togglePin = async (id, pinned) => {
    await db.query('UPDATE discussions SET is_pinned = $1 WHERE id = $2', [pinned, id]);
};