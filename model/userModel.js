const db = require('./db');

// Email ile kullanıcı bul - login ve email kontrolü için
exports.findByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Yeni kullanıcı kaydet
exports.create = async (fullname, email, hashedPassword) => {
    await db.query(
        'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4)',
        [fullname, email, hashedPassword, 'user']
    );
};

// Tüm kullanıcıları getir - admin paneli için
exports.getAll = async () => {
    const result = await db.query('SELECT id, fullname, email, role, created_at FROM users ORDER BY created_at DESC');
    return result.rows;
};

// Şifre güncelle
exports.updatePassword = async (id, hashedPassword) => {
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
};

// Kullanıcı rolünü güncelle
exports.updateRole = async (id, role) => {
    await db.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
};