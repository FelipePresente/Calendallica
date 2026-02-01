import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import auth from './middlewares/auth.js'
import trimmer from './middlewares/trimmer.js'
import lowerCase from './middlewares/lowerCase.js'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'

const app = express()

app.use(cookieParser())
app.get('/', auth, async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')

  if (req.user) return res.redirect('/dashboard')
  next()
})
app.use('/dashboard', auth)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(trimmer)
app.use(lowerCase)
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

const db_url = process.env.DB_URL
const port = process.env.PORT || 8000

mongoose.connect(db_url)
  .then(() => {
    app.listen(port)
  })