const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');

// Login sayfasını göster
exports.getLogin = (req, res) => {
    // Sadece email cookie'den okunuyor, şifre asla cookie'de tutulmaz
    const email = req.cookies.email || '';
    res.render('auth/login', {
        pageTitle: 'Giriş Yap',
        contentTitle: 'Giriş Yap',
        authInfo: { email }
    });
};

// Login işlemi
exports.postLogin = async (req, res) => {
    const { email, password, cbhatirla } = req.body;

    // DB'den kullanıcıyı bul
    const user = await userModel.findByEmail(email);
    if (!user) return res.redirect('/auth/login');

    // bcrypt ile şifre karşılaştır
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.redirect('/auth/login');

    // Session'a kullanıcı bilgilerini yaz
    req.session.isAuth = true;
    req.session.fullname = user.fullname;
    req.session.role = user.role;
    req.session.email = user.email;
    req.session.userId = user.id;

    // Beni hatırla - sadece email sakla, şifre asla saklanmaz
    if (cbhatirla === '1') {
        res.cookie('email', email);
    } else {
        res.clearCookie('email');
    }

    const url = req.query.url || '/';
    return res.redirect(url);
};

// Register sayfasını göster
exports.getRegister = (req, res) => {
    res.render('auth/register', {
        pageTitle: 'Kayıt Ol',
        contentTitle: 'Kayıt Ol'
    });
};

// Register işlemi
exports.postRegister = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Email zaten kayıtlı mı kontrol et
    const existing = await userModel.findByEmail(email);
    if (existing) return res.redirect('/auth/register');

    // Şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create(fullname, email, hashedPassword);

    res.redirect('/auth/login');
};

// Çıkış - session'ı temizle
exports.signOut = async (req, res) => {
    await req.session.destroy();
    res.redirect('/auth/login');
};