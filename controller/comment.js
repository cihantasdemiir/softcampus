const commentModel = require('../model/commentModel');
const voteModel = require('../model/voteModel');

// Yorum ekle
exports.postComment = async (req, res) => {
    const { content, is_anonymous, parent_id } = req.body;
    const discussion_id = req.params.discussionId;
    const user_id = req.session.userId;
    const anonymous = is_anonymous === '1' ? true : false;
    const parentId = parent_id ? parseInt(parent_id) : null;

    await commentModel.create(discussion_id, user_id, content, anonymous, parentId);

    res.redirect('back');
};

// Yorum sil
exports.deleteComment = async (req, res) => {
    await commentModel.delete(req.params.id);
    res.redirect('back');
};

// Yoruma oy ver
exports.voteComment = async (req, res) => {
    const { vote } = req.body;
    const user_id = req.session.userId;
    await voteModel.voteComment(req.params.id, user_id, parseInt(vote));
    res.redirect('back');
};