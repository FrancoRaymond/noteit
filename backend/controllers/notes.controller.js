import { query } from "../config/db.js"; 

export const getNotes = async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT id, title, content, created_at, updated_at
       FROM notes
       ORDER BY created_at DESC`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getNotes controller", error);
    res.status(500).json({ message: "Error getting notes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await query(
      `SELECT id, title, content, created_at, updated_at
       FROM notes
       WHERE id = $1`,
      [id]
    );
 
    if (rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Error getting note" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    await query(
      `INSERT INTO notes (title, content)
       VALUES ($1, $2)`,
      [title, content]
    );

    res.status(201).json({ message: "New note created successfully" });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Error creating note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { rows } = await query(
      `UPDATE notes
       SET title = $1, content = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, title, content, created_at, updated_at`,
      [title, content, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await query(
      `DELETE FROM notes
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Error deleting note" });
  }
};