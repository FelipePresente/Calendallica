import express from 'express'
import auth from '../middlewares/auth.js'
import Goal from '../models/Goal.js'
import Analytics from '../models/Analytics.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id })
        res.json(goals)
    } catch (error) {
        res.status(500).send("Error trying to fetch goals")
    }
})

router.post('/', auth, async (req, res) => {
    const { title, description } = req.body
    const userId = req.user.id

    if (!userId || !title || !description) return res.status(400).send("All fields must be filled")
    if (title.length > 50 || description.length > 300) return res.status(400).send('The character limit has been exceeded')

    try {
        const newGoal = { userId: userId, title: title, description: description }

        await Goal.create(newGoal)
        await Analytics.updateOne(
            { metric: "total_goals" },
            { $inc: { value: 1 } },
            { upsert: true }
        )

        res.status(201).send("Goal added successfully")
    } catch (error) {
        res.status(500).send("Error trying to add goal")
    }
})

router.patch('/:id', auth, async (req, res) => {
    const { title, description } = req.body
    const goalId = req.params.id
    const userId = req.user.id

    if (!title || !description) return res.status(400).send("All fields must be filled")
    if (title.length > 50 || description.length > 300) return res.status(400).send('The character limit has been exceeded')

    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: goalId, userId: userId },
            { title: title, description: description },
            { new: true }
        )

        if (!updatedGoal) return res.status(404).send("Goal not found")

        res.status(200).send("Goal updated successfully")
    } catch (error) {
        res.status(500).send("Error trying to update goal")
    }
})

router.delete('/:id', auth, async (req, res) => {
    const goalId = req.params.id
    const userId = req.user.id

    try {
        const deletedGoal = await Goal.findOneAndDelete({ _id: goalId, userId: userId })

        if (!deletedGoal) return res.status(404).send("Goal not found")

        res.status(200).send("Goal deleted successfully")
    } catch (error) {
        res.status(500).send("Error trying to delete goal")
    }
})

export default router