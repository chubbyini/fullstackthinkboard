import React from "react";
import { useParams, Link } from "react-router-dom";

export default function NoteDetailPage() {
  const { id } = useParams();

  return (
    <div className="note-detail-page">
      <h1>Note Details</h1>
      <p>Note ID: {id}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
