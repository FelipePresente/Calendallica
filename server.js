import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import auth from './middlewares/auth.js'
import sanitizer from './middlewares/sanitizer.js'
import trimmer from './middlewares/trimmer.js'
import lowerCase from './middlewares/lowerCase.js'
import adminRouter from './routes/admin.js'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import goalsRouter from './routes/goals.js'

const app = express()

app.use(cookieParser())
app.get('/', auth, async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')

  if (req.user) return res.redirect('/dashboard')
  next()
})
app.use('/admin', auth, (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')

  if (!req.admin) return res.redirect('/')
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(sanitizer)
app.use(trimmer)
app.use(lowerCase)
app.use('/dashboard', auth)
app.use('/admin', adminRouter)
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)
app.use('/goals', goalsRouter)
app.use(express.static('public'))

const db_url = process.env.DB_URL
const port = process.env.PORT || 8000

mongoose.connect(db_url)
  .then(() => {
    app.listen(port)
  })