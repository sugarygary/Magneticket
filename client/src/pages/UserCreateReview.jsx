import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createReview } from "../handlers/UserHandler";

export default function UserCreateReview() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const [rating, setRating] = useState(null);
  const [movieIdReview, setMovieIdReview] = useState(data.movie_id);
  const { current_user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role !== "USER") &&
      status === "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
  }, []);

  if (
    (current_user.userId == null || current_user.role !== "USER") &&
    status === "succeeded"
  ) {
    navigate("/user/login", { replace: true });
  }

  const handleStarClick = (selectedRating) => {
    // Set the rating to the clicked star
    console.log("Star clicked:", selectedRating);
    setRating(selectedRating);
  };

  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);

    if (rating == null) {
      setErrorMsg("Please select a rating");
      return;
    }

    const reviewData = {
      movieId: movieIdReview,
      rating: rating,
    };

    createReview(reviewData);
    navigate("/user/history");
  }

  return (
    <div className="h-screen flex justify-center items-center text-white">
      <div className="biruTua p-12 text-center rounded w-3/4">
        <div className="flex justify-between">
          <div></div>
          <Link to={-1} className="p-2 bg-red-500">
            {" "}
            Kembali{" "}
          </Link>
        </div>
        <form action="" className="mt-5" onSubmit={submitForm}>
          <div className="mb-3 text-left">
            <p>Rating Movie:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={rating >= star ? "star-filled" : "star"}
                  onClick={() => handleStarClick(star)}
                >
                  {rating >= star ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>

          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <div className="mb-3 text-left mt-5">
            <button className="biruMuda w-full rounded p-1 pl-2">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
