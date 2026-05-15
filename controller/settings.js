const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

// Ayarlar sayfası
exports.getSettings = (req, res) => {
    res.render('settings', {
        pageTitle: 'Ayarlar',
        session: req.session,
        message: null
    });
};

// Şifre değiştir
exports.postChangePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Yeni şifreler eşleşiyor mu
    if (newPassword !== confirmPassword) {
        return res.render('settings', {
            pageTitle: 'Ayarlar',
            session: req.session,
            message: { type: 'error', text: 'Yeni şifreler eşleşmiyor.' }
        });
    }

    // Mevcut kullanıcıyı DB'den çek
    const user = await userModel.findByEmail(req.session.email);

    // Mevcut şifreyi doğrula
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
        return res.render('settings', {
            pageTitle: 'Ayarlar',
            session: req.session,
            message: { type: 'error', text: 'Mevcut şifre hatalı.' }
        });
    }

    // Yeni şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updatePassword(user.id, hashedPassword);

    res.render('settings', {
        pageTitle: 'Ayarlar',
        session: req.session,
        message: { type: 'success', text: 'Şifreniz başarıyla güncellendi.' }
    });
};