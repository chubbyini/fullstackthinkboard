import express from "express";
import cors from "cors";
import path from "path";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
// import "./ngrok.js"; // Start ngrok tunnel

dotenv.config();

console.log(process.env.MONGO_URL); // Debugging line to check if the environment variable is loaded correctly

const app = express();

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined in .env
const _dirname = path.resolve();

// Middleware

//uses of middleware
//auth
//rate limiting

// Connect to MongoDB in the background (non-blocking)
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use("/api/notes", notesRoutes); // ✅ register routes before listen
app.use(express.static(path.join(_dirname, "../front/dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../front", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
