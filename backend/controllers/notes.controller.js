export const getNotes = (req, res) => {
    res.status(200).json({message: "you fetched notes"})
}

export const createNote = (req, res) => {
    res.status(201).json({message: "note created successfully"})
}

export const updateNote = (req, res) => {
    res.status(200).json({message: "note updated successfully"})
}

export const deleteNote = (req, res) => {
    res.status(200).json({message: "note deleted successfully"})
}