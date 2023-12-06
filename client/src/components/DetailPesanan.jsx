import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createReview } from "../handlers/UserHandler";
// import { useForm } from "react-hook-form"
// import Joi from "joi"
// import { joiResolver } from "@hookform/resolvers/joi"

const DetailPesanan = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const { current_user, status } = useSelector((state) => state.user);
  const [canReview, setCanReview] = useState(true);
  const [rating, setRating] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [movieIdReview, setMovieIdReview] = useState(
    props.responseHistory.movie_id
  );
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "USER") &&
      status == "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
    // Check if the current user's ID and movie ID are in the reviews
    const hasReviewed = props.responseReview.some(
      (review) =>
        review.reviewer === current_user.userId &&
        review.movie === props.responseHistory.movie_id
    );

    setCanReview(!hasReviewed);
  }, []);
  if (
    (current_user.userId == null || current_user.role != "USER") &&
    status == "succeeded"
  ) {
    navigate("/user/login", { replace: true });
  }
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
  const handleStarClick = (selectedRating) => {
    // Set the rating to the clicked star
    console.log("Star clicked:", selectedRating);
    setRating(selectedRating);
  };
  return (
    <div className="my-5 rounded  shadow-lg p-10 bgCardHistory border border-black">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Ringkasan Pemesanan</p>
        <span className="float-right">
          Nomor Pemesanan: {props.responseHistory._id}
        </span>
      </div>

      <div className="w-full mt-6 flex ">
        <div>
          <img
            src={props.responseHistory.movie_img}
            alt=""
            className="w-48 rounded"
          />
          <p className="text-left text-xl font-bold underline underline-offset-4">
            Detail Transaksi
          </p>
        </div>
        <div className="p-5 flex w-full justify-between ">
          <div>
            <p className="text-lg font-bold mb-5">
              {props.responseHistory.movie_title}
            </p>
            <table>
              <tr>
                <td>Bioskop</td>
                <td> : </td>
                <td>{props.responseHistory.branch_name}</td>
              </tr>

              <tr>
                <td>Tiket</td>
                <td> : </td>
                <td>{props.responseHistory.seats.length} Tiket</td>
              </tr>
              <tr>
                <td>Tempat Duduk</td>
                <td> : </td>
                <td>{props.responseHistory.seats.join(", ")}</td>
              </tr>
              <tr>
                <td>Studio</td>
                <td> : </td>
                <td>{props.responseHistory.studio_name}</td>
              </tr>
              <tr>
                <td>Hari/Tanggal</td>
                <td> : </td>
                <td>
                  <p className="font-bold">
                    {" "}
                    {moment(props.responseHistory.createdAt)
                      .tz("Asia/Jakarta")
                      .format("dddd, DD-MM-YYYY")}
                  </p>
                </td>
              </tr>
              <tr>
                <td>Waktu</td>
                <td> : </td>
                <td>
                  <p className="font-bold">
                    {moment(props.responseHistory.createdAt)
                      .tz("Asia/Jakarta")
                      .format("HH:mm")}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <p>2D Regular</p>
          <p>Biaya Layanan</p>
        </div>
        <div>
          <p>
            Rp. 50.000 <span className="abu9CA3AF">x2</span>
          </p>
          <p>
            Rp. 4.000 <span className="abu9CA3AF">x2</span>
          </p>
        </div>
      </div>
      <hr className="bg-black h-[0.2rem] text-black rounded-full mt-2" />
      <div className="justify-between flex mt-5">
        <div></div>
        <p className="font-bold">
          Total Tagihan :{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(props.responseHistory.amounts_paid)}
        </p>
      </div>
      <div className="justify-between flex mt-5">
        <div></div>

        {canReview && props.responseHistory.status == "SUCCESS" && (
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
        )}
        {!canReview && (
          <p className="p-2 bg-red-500 text-white">C an only review once</p>
        )}
      </div>
    </div>
  );
};

export default DetailPesanan;
