const discussionModel = require('../model/discussionModel');
const voteModel = require('../model/voteModel');
const commentModel = require('../model/commentModel');

// Tartışma listesi
exports.listDiscussions = async (req, res) => {
    const category = req.query.category || null;
    const discussions = await discussionModel.getAll(category);

    res.render('discussions', {
        pageTitle: 'Tartışmalar',
        session: req.session,
        discussions,
        selectedCategory: category || 'all'
    });
};

// Tartışma detay
exports.getDetail = async (req, res) => {
    const discussion = await discussionModel.getBySlug(req.params.slug);
    if (!discussion) return res.redirect('/discussions');

    await discussionModel.incrementViews(discussion.id);

    const canSeeAnonymous = req.session.role === 'admin' || req.session.role === 'moderator';

    const displayName = discussion.is_anonymous && !canSeeAnonymous
        ? 'Anonim'
        : discussion.fullname;

    // Tüm yorumları getir
    const allComments = await commentModel.getByDiscussionId(discussion.id);

    // Nested yapı: parent_id null olanlar ana yorum, diğerleri alt yorum
    const comments = allComments.filter(c => c.parent_id === null);
    const replies = allComments.filter(c => c.parent_id !== null);

    res.render('discussion-detail', {
        pageTitle: discussion.title,
        session: req.session,
        discussion,
        displayName,
        canSeeAnonymous,
        comments,
        replies
    });
};

// Tartışma oluşturma sayfası
exports.getCreate = (req, res) => {
    res.render('discussion-create', {
        pageTitle: 'Yeni Tartışma',
        session: req.session
    });
};

// Tartışma oluşturma işlemi
exports.postCreate = async (req, res) => {
    const { title, content, category, is_anonymous } = req.body;

    // Giriş yapmış kullanıcının ID'sini session'dan al
    const user_id = req.session.userId;
    const anonymous = is_anonymous === '1' ? true : false;

    await discussionModel.create(title, content, category, anonymous, user_id);
    res.redirect('/discussions');
};

// Tartışma sil - admin/moderator
exports.deleteDiscussion = async (req, res) => {
    await discussionModel.delete(req.params.id);
    res.redirect('/discussions');
};

// Tartışma sabitle/kaldır
exports.togglePin = async (req, res) => {
    const disc = await discussionModel.getById(req.params.id);
    await discussionModel.togglePin(req.params.id, !disc.is_pinned);
    res.redirect('/discussions');
};

// Oy ver
exports.vote = async (req, res) => {
    const { id } = req.params;
    const { vote } = req.body; // 1 veya -1
    const user_id = req.session.userId;

    await voteModel.vote(id, user_id, parseInt(vote));
    res.redirect('back');
};