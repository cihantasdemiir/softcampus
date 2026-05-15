const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const configSession = require('./middleware/config_session');
const cookieParser = require('cookie-parser');
const announcementModel = require('./model/announcementModel');
const statsModel = require('./model/statsModel');
const visitorCounter = require('./middleware/visitorCounter');
const updateActivity = require('./middleware/updateActivity');
const { generateToken, doubleCsrfProtection } = require('./middleware/csrf');

const settingsRouter = require('./routes/settings');
const discussionsRouter = require('./routes/discussions');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const announcementsRouter = require('./routes/announcements');
const commentsRouter = require('./routes/comments');
const galleryRouter = require('./routes/gallery');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(configSession);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Ziyaretçi sayacı - session bazlı
app.use(visitorCounter);
app.use(updateActivity);
app.use(doubleCsrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = generateToken(req, res);
    next();
});

// visitorCount'u tüm sayfalarda erişilebilir yap
app.use(async (req, res, next) => {
    try {
        res.locals.visitorCount = await statsModel.getCount();
        res.locals.activeCount = await statsModel.getActiveCount();
    } catch (e) {
        res.locals.visitorCount = 0;
        res.locals.activeCount = 0;
    }
    next();
});

// Route'lar
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/announcements', announcementsRouter);
app.use('/settings', settingsRouter);
app.use('/discussions', discussionsRouter);
app.use('/comments', commentsRouter);
app.use('/gallery', galleryRouter);

// Ana sayfa - visitorCount artık res.locals'tan geliyor
app.get('/', async (req, res) => {
    const data = await announcementModel.getAll();
    res.render('index', {
        pageTitle: 'Ana Sayfa',
        session: req.session,
        data
    });
});

app.listen(3000, () => {
    console.log('SoftCampus server running on port 3000');
});