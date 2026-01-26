import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', usersRouter)

const db_url = process.env.DB_URL
const port = process.env.PORT || 8000

mongoose.connect(db_url)
    .then(() => {
        app.listen(port)
    })