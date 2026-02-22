import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        toast.success("Note created successfully!");
        setTitle("");
        setContent("");
        navigate("/");
      } else {
        toast.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note: " + error.message);
    }
  };

  return (
    <div className="create-page">
      <h1>Create New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}
