

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        return res.redirect('/login-user');
    }
};

module.exports = isAuthenticated;
