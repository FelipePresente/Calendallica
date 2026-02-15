import express from 'express'
import 'dotenv/config'
import User from '../models/User.js'
import Analytics from '../models/Analytics.js'
import hashPassword from '../helpers/hashPassword.js'
import comparePassword from '../helpers/comparePassword.js'
import createToken from '../helpers/createToken.js'
import createSessionCookies from '../helpers/createSessionCookies.js'
import userVerification from '../helpers/userVerifications.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, password, passwordConfirmation } = req.body

    if (!passwordConfirmation) return res.status(400).json({ message: "All fields must be filled" })
    if (password !== passwordConfirmation) return res.status(400).json({ message: "The passwords must be equal" })

    if (userVerification(res, username, password)) return

    try {
        const foundUser = await User.findOne({ "username": username })

        if (foundUser) return res.status(400).json({ message: "Username already exists" })

        const hash = await hashPassword(password)
        const newUser = { "username": username, "password": hash }

        const createdUser = await User.create(newUser)

        await Analytics.updateOne({ metric: 'total_users' }, { $inc: { value: 1 } }, { upsert: true })

        const token = createToken(createdUser)

        createSessionCookies(res, createdUser, token)
        res.status(200).json({ message: "User created succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Error creating user" })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (userVerification(res, username, password)) return

    try {
        const foundUser = await User.findOne({ "username": username })

        if (!foundUser) return res.status(401).json({ message: "Invalid credentials" })

        const comparation = await comparePassword(password, foundUser.password)

        // It means wrong password but returns not found for security
        if (!comparation) return res.status(401).json({ message: "Invalid credentials" })

        const token = createToken(foundUser)

        createSessionCookies(res, foundUser, token)

        res.status(200).json({ message: "You are logged in" })
    } catch (error) {
        res.status(500).json({ message: "Error logging in" })
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('session-cookie')
    res.clearCookie('session-info')
    res.status(200).json({ message: "Logged out successfully" })
})

router.get('/me', auth, (req, res) => {
    res.json({
        logged: true,
        user: { username: req.user.username, role: req.user.role }
    })
})

export default router