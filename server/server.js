const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("./cloudinary"); 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); 

// MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// data model
const Message = mongoose.model("Message", new mongoose.Schema({
  name: String,
  message: String,
  avatarUrl: String,
  pictureUrl: String,
  createdAt: { type: Date, default: Date.now }
}));

const upload = multer({ storage: multer.memoryStorage() });

// upload buffer to Cloudinary using Promise
const uploadToCloudinary = (buffer, folder = "") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};


app.post("/api/messages", upload.fields([{ name: "avatar" }, { name: "picture" }]), async (req, res) => {
  try {
    const avatarFile = req.files?.avatar?.[0];
    const pictureFile = req.files?.picture?.[0];

    const avatarUrl = avatarFile
      ? await uploadToCloudinary(avatarFile.buffer, "avatars")
      : "";

    const pictureUrl = pictureFile
      ? await uploadToCloudinary(pictureFile.buffer, "pictures")
      : "";

    const msg = new Message({
      name: req.body.name,
      message: req.body.textarea,
      avatarUrl,
      pictureUrl
    });

    await msg.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Fails upload or DB error:", err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(" Failed to fetch messages:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
