import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to fetch note: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`/notes/${id}`, { title, content });
      setNote(res.data);
      toast.success("Note saved!");
    } catch (error) {
      toast.error("Failed to save note: " + error.message);
    } finally {
      setSaving(false);
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-error text-lg">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 note-detail-page">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost btn-sm">
            ← Back
          </Link>
          <div className="flex gap-2">
            <button className="btn btn-error btn-sm" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body gap-4">
            <input
              type="text"
              className="input input-bordered w-full text-xl font-semibold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
            <textarea
              className="textarea textarea-bordered w-full h-64 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
