import express from "express";
import {
  getnotes,
  addNote,
  deleteNote,
  updateNote,
  getNoteById,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getnotes);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
router.get("/:id", getNoteById);

export default router; // ✅ export after routes are registered
