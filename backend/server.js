import express from "express";
const app = express();

// Change 'length' to 'get'
app.get("/api/notes", (req, res) => {
  res.status(200).send("Hello from the backend sonsabitches!");
});

app.post("/api/notes", (req, res) => {
  res.status(201).json({ message: "Hello from the backend sonsabitches!" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "Hello from the backend sonsabitches!" });
});

app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "Hello from the backend sonsabitches!" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
