import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
// import "./ngrok.js"; // Start ngrok tunnel
import cors from "cors";

dotenv.config();

console.log(process.env.MONGO_URL); // Debugging line to check if the environment variable is loaded correctly

const app = express();

const PORT = process.env.PORT || 30000; // Default to 3000 if PORT is not defined in .env

// Middleware
app.use(express.json()); //this middleware allows to pass JSON bodies in the request
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Log incoming requests
  next();
});
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use(cors()); // Enable CORS for all routes (you can configure this further if needed)
//uses of middleware
//auth
//rate limiting

// Connect to MongoDB in the background (non-blocking)
connectDB()
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  });

app.use("/api/notes", notesRoutes);
