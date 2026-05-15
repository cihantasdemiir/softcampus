const db = require('./db');

// Kullanıcının bu tartışmaya verdiği oyu getir
exports.getUserVote = async (discussion_id, user_id) => {
    const result = await db.query(
        'SELECT vote FROM discussion_votes WHERE discussion_id = $1 AND user_id = $2',
        [discussion_id, user_id]
    );
    return result.rows[0];
};

// Oy ver veya güncelle
exports.vote = async (discussion_id, user_id, vote) => {
    // Mevcut oy var mı kontrol et
    const existing = await db.query(
        'SELECT vote FROM discussion_votes WHERE discussion_id = $1 AND user_id = $2',
        [discussion_id, user_id]
    );

    if (existing.rows.length > 0) {
        const currentVote = existing.rows[0].vote;

        if (currentVote === vote) {
            // Aynı oya tekrar basıldı — oyu geri al
            await db.query(
                'DELETE FROM discussion_votes WHERE discussion_id = $1 AND user_id = $2',
                [discussion_id, user_id]
            );
            // Sayacı güncelle
            if (vote === 1) {
                await db.query('UPDATE discussions SET likes = likes - 1 WHERE id = $1', [discussion_id]);
            } else {
                await db.query('UPDATE discussions SET dislikes = dislikes - 1 WHERE id = $1', [discussion_id]);
            }
        } else {
            // Farklı oya geçiş
            await db.query(
                'UPDATE discussion_votes SET vote = $1 WHERE discussion_id = $2 AND user_id = $3',
                [vote, discussion_id, user_id]
            );
            if (vote === 1) {
                await db.query('UPDATE discussions SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = $1', [discussion_id]);
            } else {
                await db.query('UPDATE discussions SET likes = likes - 1, dislikes = dislikes + 1 WHERE id = $1', [discussion_id]);
            }
        }
    } else {
        // İlk kez oy veriliyor
        await db.query(
            'INSERT INTO discussion_votes (discussion_id, user_id, vote) VALUES ($1, $2, $3)',
            [discussion_id, user_id, vote]
        );
        if (vote === 1) {
            await db.query('UPDATE discussions SET likes = likes + 1 WHERE id = $1', [discussion_id]);
        } else {
            await db.query('UPDATE discussions SET dislikes = dislikes + 1 WHERE id = $1', [discussion_id]);
        }
    }
};

// Yoruma oy ver
exports.voteComment = async (comment_id, user_id, vote) => {
    const existing = await db.query(
        'SELECT vote FROM comment_votes WHERE comment_id = $1 AND user_id = $2',
        [comment_id, user_id]
    );

    if (existing.rows.length > 0) {
        const currentVote = existing.rows[0].vote;
        if (currentVote === vote) {
            await db.query('DELETE FROM comment_votes WHERE comment_id = $1 AND user_id = $2', [comment_id, user_id]);
            if (vote === 1) {
                await db.query('UPDATE comments SET likes = likes - 1 WHERE id = $1', [comment_id]);
            } else {
                await db.query('UPDATE comments SET dislikes = dislikes - 1 WHERE id = $1', [comment_id]);
            }
        } else {
            await db.query('UPDATE comment_votes SET vote = $1 WHERE comment_id = $2 AND user_id = $3', [vote, comment_id, user_id]);
            if (vote === 1) {
                await db.query('UPDATE comments SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = $1', [comment_id]);
            } else {
                await db.query('UPDATE comments SET likes = likes - 1, dislikes = dislikes + 1 WHERE id = $1', [comment_id]);
            }
        }
    } else {
        await db.query('INSERT INTO comment_votes (comment_id, user_id, vote) VALUES ($1, $2, $3)', [comment_id, user_id, vote]);
        if (vote === 1) {
            await db.query('UPDATE comments SET likes = likes + 1 WHERE id = $1', [comment_id]);
        } else {
            await db.query('UPDATE comments SET dislikes = dislikes + 1 WHERE id = $1', [comment_id]);
        }
    }
};