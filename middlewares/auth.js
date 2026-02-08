import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secret_key = process.env.SECRET_KEY

export default async function verifyToken(req, res, next) {
    const token = req.cookies['session-cookie']

    if (!token) {
        if (req.originalUrl === '/') return next();
        return res.redirect('/users/logout')
    }

    try {
        const user = jwt.verify(token, secret_key)
        const userFromDB = await User.findById(user.id)

        if (!userFromDB) return res.redirect('/users/logout')

        req.user = userFromDB

        if (userFromDB.role === "admin") req.admin = userFromDB
        next()
    } catch (error) {
        res.clearCookie('session-info')
        res.clearCookie('session-cookie')
        res.status(400).send('Invalid Token!')
    }
}