import express from "express";
const router = express.Router();

export default router;

router.get("/", (req, res) => {
  res.status(200).send("Get all notes");
});

router.post("/", (req, res) => {
  res.status(201).send("Add a new note");
});

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete note with id ${req.params.id}` });
});

router.put("/:id", (req, res) => {
  res.json({ message: `Update note with id ${req.params.id}` });
});

router.get("/", getNotes);
router.post("/", addNote);
router.delete("/:id", deleteNote);
