import express from "express";
const router = express.Router();
import {
  getnotes,
  addNote,
  deleteNote,
  updateNote,
  getNoteById,
} from "../controllers/noteControllers.js";

export default router;

router.get("/", getnotes);

router.post("/", addNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

router.get("/:id", getNoteById);
