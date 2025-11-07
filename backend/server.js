import express from 'express'
import notesRoutes from './routes/notes.routes.js'
import { connectDb } from './config/db.js'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
connectDb()

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
    console.log("server started on PORT:", PORT)
})