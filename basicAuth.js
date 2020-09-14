const {
    users
} = require('./data');

function authUser(req, res, next) {
    const userId = req.body.userId
    req.user = users.find(user => user.id === userId)
    if (!userId) {
        res.status(404);
        return res.send('You need to sign in')
        // add some ID detection for some user with another id who not registered they're id
    } else if (!req.user) {
        res.status(403);
        return res.send('Id not detected')
    }

    next()
}

function AuthRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401);
            return res.send('you not allowed');
        }
        next()
    }

}

module.exports = {
    authUser,
    AuthRole
}