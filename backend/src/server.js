import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
// import "./ngrok.js"; // Start ngrok tunnel

dotenv.config();

console.log(process.env.MONGO_URL); // Debugging line to check if the environment variable is loaded correctly

const app = express();

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined in .env

// Middleware

//uses of middleware
//auth
//rate limiting

// Connect to MongoDB in the background (non-blocking)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes); // ✅ register routes before listen

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
