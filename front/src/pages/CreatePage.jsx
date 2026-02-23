import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post("/notes", { title, content });
      toast.success("Note created!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create note: " + error.message);
      if (error.response && error.response.status === 429) {
        (toast.error("You are being rate limited. Please try again later."),
          {
            duration: 5000,
            style: {
              background: "#ff4d4f",
              color: "#fff",
              icon: "😢",
            },
          });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="btn btn-ghost btn-sm">
            ← Back
          </Link>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create a Note</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-48"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Saving..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
