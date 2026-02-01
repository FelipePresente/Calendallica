import express from 'express'
import Task from '../models/Task.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const userId = req.user.id

    if (!userId) return res.status(400).send("User id is needed")

    try {
        const myTasks = await Task.find({ "userId": userId }, "-userId -__v")

        res.json(myTasks)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error trying to get tasks")
    }
})

router.post('/', auth, async (req, res) => {
    const { date, title, description } = req.body
    const userId = req.user.id

    if (!userId || !date || !title || !description) return res.status(400).send("All fields must be filled")
    if (title.length > 50 || description.length > 300) return res.status(400).send('The character limit has been exceeded')

    try {
        const newTask = { "date": date, "title": title, "description": description, "userId": userId }

        await Task.create(newTask)
        res.status(201).send("Task created successfully")
    } catch (error) {
        res.status(500).send("Error trying to create task")
    }
})

router.patch('/:taskId', auth, async (req, res) => {
    const { date, title, description } = req.body
    const { taskId } = req.params
    const userId = req.user.id

    if (!userId || !date || !title || !description) return res.status(400).send("All fields must be filled")
    if (title.length > 50 || description.length > 300) return res.status(400).send('The character limit has been exceeded')

    try {
        const newTask = { "date": date, "title": title, "description": description }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            newTask,
            { new: true }
        )

        if (!updatedTask) return res.status(404).send("Task not found or unauthorized")

        res.status(200).send("Task updated successfully")
    } catch (error) {
        console.error("Patch error:", error)
        res.status(500).send("Error trying to edit task")
    }
})

router.delete('/:taskId', auth, async (req, res) => {
    const { taskId } = req.params
    const userId = req.user.id

    if (!taskId) return res.status(400).send("All fields must be filled")

    try {
        const target = { "_id": taskId, "userId": userId }

        const taskToDelete = await Task.findOneAndDelete(target)

        if (!taskToDelete) return res.status(400).send("Task not found or unauthorized")

        res.status(200).send("Task deleted successfully")
    } catch (error) {
        res.status(500).send("Error trying to delete task")
    }
})

export default router