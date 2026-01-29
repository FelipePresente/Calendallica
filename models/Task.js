import mongoose from "mongoose"

const taskScheme = new mongoose.Schema({
    date: { type: "Date", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    userId: { type: "ObjectId", required: true }
})

const Task = mongoose.model('Task', taskScheme)

export default Task