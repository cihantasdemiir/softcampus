const db = require('./db');

// Tartışmaya ait tüm yorumları getir (nested için parent_id ile)
exports.getByDiscussionId = async (discussion_id) => {
    const result = await db.query(
        `SELECT c.*, u.fullname 
         FROM comments c 
         LEFT JOIN users u ON c.user_id = u.id 
         WHERE c.discussion_id = $1 
         ORDER BY c.created_at ASC`,
        [discussion_id]
    );
    return result.rows;
};

// Yorum ekle
exports.create = async (discussion_id, user_id, content, is_anonymous, parent_id = null) => {
    await db.query(
        'INSERT INTO comments (discussion_id, user_id, content, is_anonymous, parent_id) VALUES ($1, $2, $3, $4, $5)',
        [discussion_id, user_id, content, is_anonymous, parent_id]
    );
};

// Yorum sil
exports.delete = async (id) => {
    await db.query('DELETE FROM comments WHERE id = $1', [id]);
};

// ID ile yorum getir
exports.getById = async (id) => {
    const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0];
};