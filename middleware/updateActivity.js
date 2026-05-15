const db = require('../model/db');

module.exports = async (req, res, next) => {
    // Sadece giriş yapmış kullanıcılar için güncelle
    if (req.session.isAuth && req.session.userId) {
        try {
            await db.query(
                'UPDATE users SET last_activity = NOW() WHERE id = $1',
                [req.session.userId]
            );
        } catch (e) {}
    }
    next();
};