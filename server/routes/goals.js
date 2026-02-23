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
        res.status(500).json({ message: "Failed to retrieve goals." })
    }
})

router.post('/', auth, async (req, res) => {
    const { title, description } = req.body
    const userId = req.user.id

    if (!userId || !title) return res.status(400).json({ message: "Please fill in all required fields." })
    if (title.length > 50 || description && description.length > 300) return res.status(400).json({ message: "Character limit exceeded." })

    try {
        const newGoal = { userId: userId, title: title, description: description }

        await Goal.create(newGoal)
        await Analytics.updateOne(
            { metric: "total_goals" },
            { $inc: { value: 1 } },
            { upsert: true }
        )

        res.status(201).json({ message: "Goal added successfully." })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while adding the goal." })
    }
})

router.patch('/:id', auth, async (req, res) => {
    const { title, description } = req.body
    const goalId = req.params.id
    const userId = req.user.id

    if (!title) return res.status(400).json({ message: "Please fill in all required fields." })
    if (title.length > 50 || description && description.length > 300) return res.status(400).json({ message: "Character limit exceeded." })

    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { _id: goalId, userId: userId },
            { title: title, description: description },
            { new: true }
        )

        if (!updatedGoal) return res.status(404).json({ message: "Goal not found." })

        res.status(200).json({ message: "Goal updated successfully." })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the goal." })
    }
})

router.delete('/:id', auth, async (req, res) => {
    const goalId = req.params.id
    const userId = req.user.id

    try {
        const deletedGoal = await Goal.findOneAndDelete({ _id: goalId, userId: userId })

        if (!deletedGoal) return res.status(404).json({ message: "Goal not found." })

        res.status(200).json({ message: "Goal deleted successfully." })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the goal." })
    }
})

export default router