module.exports = (req, res, next) => {
    if (req.session.role !== 'admin' && req.session.role !== 'moderator') {
        return res.status(403).render('403', {
            pageTitle: 'Yetkisiz Erişim',
            session: req.session
        });
    }
    next();
};