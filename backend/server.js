import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes.routes.js'
import { connectDb } from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes", notesRoutes)
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server started on PORT:", PORT)
    })
})
