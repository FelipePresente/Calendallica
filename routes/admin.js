import express from 'express'
import auth from '../middlewares/auth.js'
import Analytics from '../models/Analytics.js'

const router = express.Router()

router.get('/metrics', auth, async (req, res) => {
    const users_data = await Analytics.findOne({ metric: "total_users" })
    const tasks_data = await Analytics.findOne({ metric: "total_tasks" })

    const data = {
        users_data: users_data ? users_data.value : 0,
        tasks_data: tasks_data ? tasks_data.value : 0
    }

    res.json(data)
})

export default router