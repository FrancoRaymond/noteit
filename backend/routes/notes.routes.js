import express from "express";
import { getNotes, createNote, deleteNote, updateNote } from "../controllers/notes.controller.js";

const router = express.Router()

router.get("/", getNotes)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router

// B0SgBvGdHX4samVg

// francoreason_db_user

// B0SgBvGdHX4samVg

// mongodb+srv://francoreason_db_user:B0SgBvGdHX4samVg@cluster0.qgaky36.mongodb.net/?appName=Cluster0