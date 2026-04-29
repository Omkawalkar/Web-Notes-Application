const Note = require("../models/Note");

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if note belongs to user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    try {
        const { title, content, pinned, favorite, folder } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = await Note.create({
            title,
            content,
            pinned: pinned || false,
            favorite: favorite || false,
            folder: folder || "",
            user: req.user.id,
        });

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if note belongs to user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const { title, content, pinned, favorite, folder } = req.body;

        note.title = title || note.title;
        note.content = content || note.content;
        note.pinned = pinned !== undefined ? pinned : note.pinned;
        note.favorite = favorite !== undefined ? favorite : note.favorite;
        note.folder = folder !== undefined ? folder : note.folder;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Check if note belongs to user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await note.deleteOne();
        res.status(200).json({ message: "Note removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
};