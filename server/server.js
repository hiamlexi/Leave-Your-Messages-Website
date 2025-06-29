const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const dotenv = require("dotenv")
dotenv.config();

app.use(cors());
app.use("/uploads", express.static("uploads")); // serve static files

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const Message = mongoose.model("Message", new mongoose.Schema({
  name: String,
  message: String,
  avatarUrl: String,
  pictureUrl: String,
  createdAt: { type: Date, default: Date.now }
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

app.post("/api/messages", upload.fields([{ name: "avatar" }, { name: "picture" }]), async (req, res) => {
  const avatarFile = req.files?.avatar?.[0];
  const pictureFile = req.files?.picture?.[0];

  const msg = new Message({
    name: req.body.name,
    message: req.body.textarea,
    avatarUrl: avatarFile ? `/uploads/${avatarFile.filename}` : "",
    pictureUrl: pictureFile ? `/uploads/${pictureFile.filename}` : ""
  });

  await msg.save();
  res.json({ success: true });
});

app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.listen(5000, () => console.log("Server running on port 5000"));
