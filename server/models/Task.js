import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    date: { type: "Date", required: true },
    title: { type: "String", required: true },
    description: { type: "String" },
    userId: { type: "ObjectId", required: true }
})

taskSchema.index({ 'date': 1 }, { expireAfterSeconds: 86400 })

const Task = mongoose.model('Task', taskSchema)

export default Task