const statsModel = require('../model/statsModel');

module.exports = async (req, res, next) => {
    // Sadece HTML sayfalarında say, static dosyalarda sayma
    if (!req.session.visited && !req.path.startsWith('/uploads') && !req.path.startsWith('/css') && !req.path.startsWith('/js')) {
        await statsModel.increment();
        req.session.visited = true;
    }
    next();
};