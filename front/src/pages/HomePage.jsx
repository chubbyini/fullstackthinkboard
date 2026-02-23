import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { RateLimitedUI } from "../components/RateLimitedUI";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { NoteCard } from "../components/NoteCard";
import { NotebookTabsIcon } from "lucide-react";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        setLoading(false);
        setNotes(res.data);
        setIsRateLimited(false);
        console.log("Fetched notes:", res.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <p className="text-center text-gray-500">Loading notes...</p>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <div className="text-center py-12 border border-gray-900 flex flex-col items-center bg-transparent rounded-lg max-w mx-auto">
            <NotebookTabsIcon className="mx-auto mb-4 w-12 h-12 text-primary" />
            <h2 className="text-2xl font-bold text-primary">No Notes Found</h2>
            <p className="text-primary mt-2">
              You haven't created any notes yet. Click the button below to get
              started!
            </p>
            <Link to={"/create"} className="btn btn-primary mt-4">
              Create Note
            </Link>
          </div>
        )}

        {notes.length > 0 && !loading && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
