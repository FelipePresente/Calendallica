import express from 'express'
import cors from 'cors'
import { generalLimiter, submitLimiter } from './helpers/rate-limit.js'
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

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(cookieParser())
app.use('/admin', auth, (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')

  if (!req.admin) return res.status(401).json({ error: 'Unauthorized' })
  next()
})
app.use(express.json())
app.use(sanitizer)
app.use(trimmer)
app.use(lowerCase)
app.use('/admin', adminRouter)
app.use(generalLimiter)
app.use((req, res, next) => {
  const methods = ['POST', 'PATCH', 'DELETE']

  if (methods.includes(req.method)) return submitLimiter(req, res, next)

  next()
})
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)
app.use('/goals', goalsRouter)

const db_url = process.env.DB_URL
const port = process.env.PORT || 8000

mongoose.connect(db_url)
  .then(() => {
    app.listen(port)
  })