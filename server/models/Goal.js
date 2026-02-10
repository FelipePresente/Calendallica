import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    description: { type: 'String', required: true },
    userId: { type: 'ObjectId', required: true }
})

const Goal = mongoose.model('Goal', goalSchema)

export default Goal