const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']
    req.error = false
    if (token === '') {
        req.error = true
    } else {
        try {
            const decoded = jwt.verify(token, 'EstaEsLaAPP')
            req.decoded = decoded
        } catch (err) {
            req.error = true
        }
    }
    return next()
}

module.exports = verifyToken