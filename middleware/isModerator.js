// Moderator VEYA admin erişebilir
module.exports = (req, res, next) => {
    if (req.session.role !== 'moderator' && req.session.role !== 'admin') {
        return res.status(403).render('403', {
            pageTitle: 'Yetkisiz Erişim',
            session: req.session
        });
    }
    next();
};