const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes"); // ADD THIS
const folderRoutes = require("./routes/folderRoutes"); 

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes); // ADD THIS
app.use("/api/folders", folderRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});