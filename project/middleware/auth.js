

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        req.session.lastUrl = req.originalUrl;
        return res.redirect('/login-user');
    }
};

module.exports = isAuthenticated;
