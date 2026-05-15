const db = require('./db');

// Ziyaretçi sayısını getir
exports.getCount = async () => {
    const result = await db.query('SELECT visitor_count FROM site_stats WHERE id = 1');
    return result.rows[0].visitor_count;
};

// Ziyaretçi sayısını artır
exports.increment = async () => {
    await db.query('UPDATE site_stats SET visitor_count = visitor_count + 1 WHERE id = 1');
};

// Son 5 dakikada aktif kullanıcı sayısı
exports.getActiveCount = async () => {
    const result = await db.query(
        "SELECT COUNT(*) FROM users WHERE last_activity > NOW() - INTERVAL '5 minutes'"
    );
    return parseInt(result.rows[0].count);
};