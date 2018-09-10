const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isLogin = (req, res, next) => {
    let token = req.headers.token
    let decode = jwt.verify(token, 'process.env.JWT_SECRET')
    console.log('ini decode dari isLogin ===>', decode)
     if (token) {
        User.findOne({
            email: decode.email 
        })
        .then((data) => {
            if (data) {
                next()
            } else {
                res.status(400).json({
                    message: 'User is not Authenticated'
                })
            } 
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    } else {
        res.status(400).json({
            message: 'no token'
        })
    }
}

module.exports = isLogin 