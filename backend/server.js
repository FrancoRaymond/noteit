import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes.routes.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import path from 'path'
import fs from 'node:fs/promises'
import dns from 'dns'
import { query } from './config/db.js' // adjust path to your pg pool file
//  DATABASE_URL=postgresql://postgres:noteit@postgresql@db.lgwqkcplvfcgghjmblpb.supabase.co:5432/postgres

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()
 
dns.setServers(['8.8.8.8', '1.1.1.1'])

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
}

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

async function initDatabase() {
  const schemaPath = path.join(__dirname, "models", "note.sql")
  const schemaSql = await fs.readFile(schemaPath, "utf8")
  await query(schemaSql)
}

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server started on PORT:", PORT)
    })
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err)
    process.exit(1)
  })
