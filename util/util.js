var jwt = require('jsonwebtoken');

module.exports.getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.name,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    })
}

module.exports.isAuth = (req, res, next) => {
    var token = req.headers.authorization;
    if (token) {
        var onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return
        })
    } else {
        return res.status(401).send({ message: "Token is not supplied!" })
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: "Admin Token is not valid!" })
}


module.exports.isStaffOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isStaff || req.user.isAdmin)) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin/Staff Token' });
    }
};
