const Folder = require("../models/Folder");

// @desc    Get all folders for logged in user
// @route   GET /api/folders
// @access  Private
const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Create a new folder
// @route   POST /api/folders
// @access  Private
const createFolder = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Folder name is required" });
        }

        // Check if folder already exists for this user
        const existingFolder = await Folder.findOne({ 
            name: name.trim(), 
            user: req.user.id 
        });

        if (existingFolder) {
            return res.status(400).json({ message: "Folder already exists" });
        }

        const folder = await Folder.create({
            name: name.trim(),
            user: req.user.id,
        });

        res.status(201).json(folder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update a folder
// @route   PUT /api/folders/:id
// @access  Private
const updateFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folder = await Folder.findById(req.params.id);

        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Check if folder belongs to user
        if (folder.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Check if new name already exists for this user
        const existingFolder = await Folder.findOne({ 
            name: name.trim(), 
            user: req.user.id,
            _id: { $ne: req.params.id }
        });

        if (existingFolder) {
            return res.status(400).json({ message: "Folder name already exists" });
        }

        folder.name = name.trim();
        const updatedFolder = await folder.save();

        res.status(200).json(updatedFolder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
const deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);

        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Check if folder belongs to user
        if (folder.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await folder.deleteOne();
        res.status(200).json({ message: "Folder removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder,
};