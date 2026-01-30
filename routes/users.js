import express from 'express'
import 'dotenv/config'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import hashPassword from '../middlewares/hashPassword.js'
import comparePassword from '../middlewares/comparePassword.js'

const router = express.Router()
const secret_key = process.env.SECRET_KEY

router.post('/signup', async (req, res) => {
    const { username, password, passwordConfirmation } = req.body

    if (!username || !password || !passwordConfirmation) return res.status(400).send("All fields must be filled")
    if (password !== passwordConfirmation) return res.status(400).send("The passwords must be equal")
    if (username.length < 4) return res.status(400).send("Username minimum number of characters is 4")
    if (username.length > 12) return res.status(400).send("Username maximum number of characters is 12")
    if (password.length < 8 || passwordConfirmation.length < 8) return res.status(400).send("Password fields minimum number of characters is 8")
    if (password.length > 35 || passwordConfirmation.length > 35) return res.status(400).send("Password fields maximum number of characters is 35")
    if (password.includes(" ")) return res.status(400).send("Password must not include spaces")

    try {
        const foundUser = await User.findOne({ "username": username })

        if (foundUser) return res.status(400).send("Username already exists")

        const hash = await hashPassword(password)
        const newUser = { "username": username, "password": hash }

        const createdUser = await User.create(newUser)

        const token = jwt.sign(
            {
                id: createdUser._id,
                username: createdUser.username,
                role: createdUser.role
            }, secret_key
        )

        res.cookie('session-info', JSON.stringify({ username: createdUser.username, id: createdUser._id }), { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 14 })
        res.cookie('session-cookie', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
        res.status(200).json({ message: "User created succesfully" })
    } catch (error) {
        res.status(500).send("Error creating user")
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).send("All fields must be filled")
    if (username.length < 4) return res.status(400).send("Username minimum number of characters is 4")
    if (username.length > 12) return res.status(400).send("Username maximum number of characters is 12")
    if (password.length < 8) return res.status(400).send("Password minimum number of characters is 8")
    if (password.length > 35) return res.status(400).send("Password maximum number of characters is 35")

    try {
        const foundUser = await User.findOne({ "username": username })

        if (!foundUser) return res.status(401).send("Invalid credentials")

        const comparation = await comparePassword(password, foundUser.password)

        // It means wrong password but returns not found for security
        if (!comparation) return res.status(401).send("Invalid credentials")

        const token = jwt.sign(
            {
                id: foundUser._id,
                username: foundUser.username,
                role: foundUser.role
            }, secret_key
        )

        res.cookie('session-info', JSON.stringify({ username: foundUser.username, id: foundUser._id }), { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 14 })
        res.cookie('session-cookie', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
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