import express from 'express'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/me', auth, (req, res) => {
    res.json({
        username: req.user.username,
        role: req.user.role
    })
})

router.get('/ping', (req, res) => {
    res.json({ message: "The server is awake 😊" })
})

export default router