import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { createScreening } from "../handlers/CineplexHandler";

export default function CineplexCreateScreening() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [studioId, setStudioId] = useState(data.currentStudio);
  const [movieId, setMovieId] = useState(null);
  const [price, setPrice] = useState(null);
  const [showTime, setShowTime] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorStudio, setErrorStudio] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { current_user, status } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "CINEPLEX") &&
      status == "succeeded"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "CINEPLEX") &&
    status == "succeeded"
  ) {
    navigate("/", { replace: true });
  }
  // const findStudio = (studio_id) => {
  //   const foundStudio = data.studios.find((studio) => studio._id === studio_id);
  //   console.log(foundStudio);
  //   return foundStudio;
  // };
  let foundStudio = null;
  const submitForm = async (e) => {
    e.preventDefault();
    //harus ngecek apakah studio nya punya orang yang lagi login
    if (
      studioId == null ||
      movieId == null ||
      price == null ||
      showTime == null
    ) {
      setErrorMsg("Input ada yang kosong");
      return;
    }
    // foundStudio = findStudio(studioId);

    // if (foundStudio == null || foundStudio == undefined) {
    //   setErrorStudio("Studio Id tidak valid / Studio Id kamu tidak terdaftar");
    //   return;
    // }
    let showtime_date = new Date(showTime).getTime();
    let end = moment().tz("Asia/Jakarta").add(1, "days").endOf("day").toDate();
    if (showtime_date <= end.getTime()) {
      setErrorMsg("Tanggal minimal 2 hari dari sekarang");
      return;
    }
    let data = {
      studio_id: studioId,
      movie_id: movieId,
      price: price,
      showtime: showTime,
    };
    try {
      const berhasil = await createScreening(data);
      if (berhasil) {
        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    navigate(0);
  };
  return (
    <div className=" w-full h-full justify-center items-center text-white my-10 px-2">
      <div className="biruTua p-5 rounded w-full sm:w-3/4 mx-auto mb-5">
        <div className="flex justify-between">
          <p className="text-xl sm:text-2xl font-bold mb-5">Tambah Jadwal Screening</p>
          <Link className="p-2 h-fit rounded bg-red-500" to={-1}>
            Kembali
          </Link>
        </div>

        <form onSubmit={submitForm}>
          {/* <div className="mb-5">
            <p>Studio Id</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your studio id"
              onChange={(e) => {
                setStudioId(e.target.value);
              }}
            />
            {errorStudio && <span className="text-red-500">{errorStudio}</span>}
          </div> */}
          <div className="mb-5">
            <p>Movie Id</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your movie id"
              onChange={(e) => {
                setMovieId(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <p>Price</p>
            <input
              type="number"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <p>Show Time</p>
            <input
              type="text"
              className="abuInput w-full rounded p-1 pl-2"
              placeholder="Enter your show time"
              onChange={(e) => {
                setShowTime(e.target.value);
              }}
            />
          </div>
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
          <button className="biruCariTiket w-full p-2 rounded">
            Tambahkan Screening
          </button>
        </form>
        {openModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <p className="text-green-500">Loading completed!</p>
              <button onClick={closeModal}>Refresh halaman</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
