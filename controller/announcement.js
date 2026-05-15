const announcementModel = require('../model/announcementModel');
const userModel = require('../model/userModel');
const discussionModel = require('../model/discussionModel');

// Admin dashboard
exports.dashboard = async (req, res) => {
    const announcements = await announcementModel.getAll();
    const users = await userModel.getAll();
    const discussions = await discussionModel.getAll();
    const active = announcements.filter(a => a.is_active).length;

    res.render('admin/dashboard', {
        pageTitle: 'Admin Paneli',
        session: req.session,
        announcements,
        users,
        discussions,
        stats: {
            announcements: announcements.length,
            users: users.length,
            active
        }
    });
};

// Duyuru listesi - admin
exports.listAnc = async (req, res) => {
    const data = await announcementModel.getAll();
    res.render('admin/list-anc', {
        pageTitle: 'Duyurular',
        contentTitle: 'Duyuru Listesi',
        data,
        session: req.session
    });
};

// Duyuru ekleme sayfası
exports.getAddAnc = (req, res) => {
    res.render('admin/add-anc', {
        pageTitle: 'Duyuru Ekle',
        contentTitle: 'Duyuru Ekle',
        session: req.session
    });
};

// Duyuru ekleme işlemi
exports.postAddAnc = async (req, res) => {
    const { title, content, category, isActive } = req.body;
    await announcementModel.create(title, content, category, isActive ? true : false);
    res.redirect('/admin/list/anc');
};

// Duyuru düzenleme sayfası
exports.getEditAnc = async (req, res) => {
    const data = await announcementModel.getById(req.params.id);
    res.render('admin/edit-anc', {
        pageTitle: 'Duyuru Düzenle',
        contentTitle: 'Duyuru Düzenle',
        data,
        session: req.session
    });
};


// Duyuru düzenleme işlemi
exports.postEditAnc = async (req, res) => {
    const { title, content, category, isActive } = req.body;
    await announcementModel.update(req.params.id, title, content, category, isActive ? true : false);
    res.redirect('/admin/list/anc');
};

// Duyuru silme
exports.deleteAnc = async (req, res) => {
    await announcementModel.delete(req.params.id);
    res.redirect('/admin/list/anc');
};

// Duyuru detay - slug ile bulunur
exports.getDetail = async (req, res) => {
    const data = await announcementModel.getBySlug(req.params.slug);
    if (!data) return res.redirect('/');
    res.render('announcements/detail', {
        pageTitle: data.title,
        contentTitle: data.title,
        data,
        session: req.session
    });
};

// Duyuru sabitle/kaldır
exports.togglePin = async (req, res) => {
    const anc = await announcementModel.getById(req.params.id);
    await announcementModel.togglePin(req.params.id, !anc.is_pinned);
    res.redirect('/admin/list/anc');
};