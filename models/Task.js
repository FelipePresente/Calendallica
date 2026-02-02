import mongoose from "mongoose"

const taskScheme = new mongoose.Schema({
    date: { type: "Date", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    userId: { type: "ObjectId", required: true }
})

taskScheme.index({ 'date': 1 }, { expireAfterSeconds: 86400 })

const Task = mongoose.model('Task', taskScheme)

export default Task