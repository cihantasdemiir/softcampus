const { doubleCsrf } = require('csrf-csrf');

const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => 'softcampus-csrf-secret-key',
    cookieName: 'x-csrf-token',
    cookieOptions: {
        sameSite: 'strict',
        secure: false, // production'da true yap
        signed: false
    },
    getTokenFromRequest: (req) => req.body._csrf
});

module.exports = { generateToken, doubleCsrfProtection };