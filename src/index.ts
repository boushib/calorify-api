import express from 'express'
import cors from 'cors'
import { config as envConfig } from 'dotenv'
import { userRouter } from './routes'
import { connectDB } from './utils'

envConfig()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Calorify API v1' })
})

app.use('/api/v1', userRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
