import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { RateLimitedUI } from "../components/RateLimitedUI";
import axios from "axios";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setLoading(false);
        console.log("Fetched notes:", res.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        }
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
}
