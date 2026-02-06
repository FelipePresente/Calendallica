import express from 'express'
import 'dotenv/config'
import User from '../models/User.js'
import Analytics from '../models/Analytics.js'
import hashPassword from '../helpers/hashPassword.js'
import comparePassword from '../helpers/comparePassword.js'
import createToken from '../helpers/createToken.js'
import createSessionCookies from '../helpers/createSessionCookies.js'
import userVerification from '../helpers/userVerifications.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, password, passwordConfirmation } = req.body

    if (!passwordConfirmation) return res.status(400).send("All fields must be filled")
    if (password !== passwordConfirmation) return res.status(400).send("The passwords must be equal")

    if (userVerification(res, username, password)) return

    try {
        const foundUser = await User.findOne({ "username": username })

        if (foundUser) return res.status(400).send("Username already exists")

        const hash = await hashPassword(password)
        const newUser = { "username": username, "password": hash }

        const createdUser = await User.create(newUser)

        await Analytics.updateOne({ metric: 'total_users' }, { $inc: { value: 1 } }, { upsert: true })

        const token = createToken(createdUser)

        createSessionCookies(res, createdUser, token)
        res.status(200).json({ message: "User created succesfully" })
    } catch (error) {
        res.status(500).send("Error creating user")
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    userVerification(res, username, password)

    try {
        const foundUser = await User.findOne({ "username": username })

        if (!foundUser) return res.status(401).send("Invalid credentials")

        const comparation = await comparePassword(password, foundUser.password)

        // It means wrong password but returns not found for security
        if (!comparation) return res.status(401).send("Invalid credentials")

        const token = createToken(foundUser)

        createSessionCookies(res, foundUser, token)

        res.status(200).send("You are logged in")
    } catch (error) {
        res.send("Error logging in")
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('session-cookie')
    res.clearCookie('session-info')
    res.redirect('/')
})

export default router