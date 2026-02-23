import { PenSquareIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    // Implement delete functionality here
    console.log("Delete note with ID:", note._id);
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axiosInstance.delete(`/notes/${note._id}`);
        toast.success("Note deleted!");
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
        // Optionally, you can trigger a refresh of the notes list here
      } catch (error) {
        toast.error("Error deleting note: " + error.message);
      }
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card block bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-primary"
    >
      <div className="card-body gap-3">
        <h3 className="card-title text-base-content text-lg font-semibold">
          {note.title}
        </h3>
        <p className="text-base-content/70 text-sm line-clamp-3">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <span className="text-xs text-base-content/50">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs">
              <PenSquareIcon className="w-4 h-4 text-base-content/60" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
