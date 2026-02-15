import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secret_key = process.env.SECRET_KEY

export default async function verifyToken(req, res, next) {
    const token = req.cookies['session-cookie']

    if (!token) return res.status(401).json({ error: "Authentication required" })

    try {
        const user = jwt.verify(token, secret_key)
        const userFromDB = await User.findById(user.id)

        if (!userFromDB) {
            res.clearCookie('session-cookie')
            return res.status(401).json({ error: "User no longer exists" })
        }

        req.user = userFromDB

        if (userFromDB.role === "admin") req.admin = userFromDB

        next()
    } catch (error) {
        res.clearCookie('session-info')
        res.clearCookie('session-cookie')
        res.status(400).json({ error: "Invalid Token!" })
    }
}