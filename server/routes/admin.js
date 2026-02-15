import express from 'express'
import auth from '../middlewares/auth.js'
import Analytics from '../models/Analytics.js'

const router = express.Router()

router.get('/metrics', auth, async (req, res) => {
    if (!req.admin) return res.status(403).json({ message: "Unauthorized" })

    const users_data = await Analytics.findOne({ metric: "total_users" })
    const tasks_data = await Analytics.findOne({ metric: "total_tasks" })
    const goals_data = await Analytics.findOne({ metric: "total_goals" })

    const data = {
        users_data: users_data ? users_data.value : 0,
        tasks_data: tasks_data ? tasks_data.value : 0,
        goals_data: goals_data ? goals_data.value: 0
    }

    res.json(data)
})

export default router