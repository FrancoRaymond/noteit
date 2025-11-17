import note from "../models/note.model.js"

export const getNotes = async (req, res) => {
    try {
        const notes = await note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getNotes controller", error)
        res.status(500).json({message: "Error getting notes"}) 
    }
}

export const getNoteById = async (req, res) => {
    try {
        const receivedNote = await note.findById(req.params.id)
        if(!receivedNote){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(receivedNote)
    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(500).json({message: "Error getting note"})
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const newNote = new note({title, content})
        await newNote.save()
        res.status(201).json({message : "New note created successfully"})
    } catch (error) {
        console.error("Error in createNote controller", error)
        res.status(500).json({message: "Error creating note"})
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updateNote = await note.findByIdAndUpdate(req.params.id,{title, content})

        if(!updateNote){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: "Note updated successfully"})
    } catch (error) {
        console.error("Error in updateNote controller", error)
        res.status(500).json({message: "Error updating note"})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"})
        }
        return res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        console.error("Error in deleteNote controller", error)
        res.status(500).json({message: "Error deleting note"})
    }
}