const express = require("express");
const router = express.Router();
const {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

router.route("/")
    .get(getNotes)
    .post(createNote);

router.route("/:id")
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;