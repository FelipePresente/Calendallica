import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Task from '../models/Task.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params

    const userFromDB = req.user

    if (userFromDB._id.toString() !== id) return res.status(401).send("Unauthorized")
    if (!id) return res.status(400).send("User id is needed")

    try {
        const myTasks = await Task.find({ "userId": id }, "-userId -__v")

        res.json(myTasks)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error trying to get tasks")
    }
})

router.post('/:id', auth, async (req, res) => {
    const { date, title, description } = req.body
    const { id } = req.params
    const userFromDB = req.user

    if (userFromDB._id.toString() !== id) return res.status(401).send("Unauthorized")
    if (!id || !date || !title || !description) return res.status(400).send("All fields must be filled")

    try {
        const foundUser = await User.findById(id)

        if (!foundUser) return res.send("No user found")

        const newTask = { "date": date, "title": title, "description": description, "userId": id }

        await Task.create(newTask)
        res.status(201).send("Task created successfully")
    } catch (error) {
        res.status(500).send("Error trying to create task")
    }
})

router.patch('/:taskId', auth, async (req, res) => {
    const { date, title, description, userId } = req.body
    const { taskId } = req.params
    const userFromDB = req.user

    if (userFromDB._id.toString() !== userId) return res.status(401).send("Unauthorized")
    if (!userId || !date || !title || !description) return res.status(400).send("All fields must be filled")

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

export default router