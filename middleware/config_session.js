const session = require('express-session');

const configSession = session({
    secret: 'softcampus-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 1 }
});

module.exports = configSession;