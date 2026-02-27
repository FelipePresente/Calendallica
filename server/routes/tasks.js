import express from 'express'
import Task from '../models/Task.js'
import Analytics from '../models/Analytics.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const userId = req.user.id

    if (!userId) return res.status(400).json({ message: "User ID is required." })

    try {
        const myTasks = await Task.find({ "userId": userId }, "-userId -__v")

        res.json(myTasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to retrieve tasks." })
    }
})

router.post('/', auth, async (req, res) => {
    const { date, title, description } = req.body
    const userId = req.user.id
    const userDate = new Date(date)
    const serverDate = new Date()

    serverDate.setUTCHours(0, 0, 0, 0)

    // Create a 24h margin to allow users in behind-UTC timezones (like Brazil)
    // to create tasks for their current day even if it's already tomorrow in UTC.
    const dateLimit = new Date(serverDate)
    dateLimit.setDate(dateLimit.getDate() - 1)

    if (!userId || !date || !title) return res.status(400).json({ message: "Please fill in all required fields." })
    if (title.length > 50 || description && description.length > 300) return res.status(400).json({ message: "Character limit exceeded." })
    if (userDate < dateLimit) return res.status(400).json({ message: "Cannot create tasks for past dates." })


    try {
        const newTask = { date: date, title: title, description: description, userId: userId }

        await Task.create(newTask)

        await Analytics.updateOne(
            { metric: "total_tasks" },
            { $inc: { value: 1 } },
            { upsert: true }
        )
        res.status(201).json({ message: "Task created successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the task." })
    }
})

router.patch('/:taskId', auth, async (req, res) => {
    const { date, title, description } = req.body
    const { taskId } = req.params
    const userId = req.user.id

    if (!userId || !date || !title) return res.status(400).json({ message: "Please fill in all required fields." })
    if (title.length > 50 || description && description.length > 300) return res.status(400).json({ message: "Character limit exceeded." })

    try {
        const newTask = { "date": date, "title": title, "description": description }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            newTask,
            { new: true }
        )

        if (!updatedTask) return res.status(404).json({ message: "Task not found or user unauthorized." })

        res.status(200).json({ message: "Task updated successfully" })
    } catch (error) {
        console.error("Patch error:", error)
        res.status(500).json({ message: "An error occurred while updating the task." })
    }
})

router.delete('/:taskId', auth, async (req, res) => {
    const { taskId } = req.params
    const userId = req.user.id

    if (!taskId) return res.status(400).json({ message: "Task ID is required." })

    try {
        const target = { "_id": taskId, "userId": userId }

        const taskToDelete = await Task.findOneAndDelete(target)

        if (!taskToDelete) return res.status(400).json({ message: "Task not found or user unauthorized." })

        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the task." })
    }
})

export default router