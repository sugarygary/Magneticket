import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";
import client from "../util/client";

export default function CineplexJadwal() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { current_user, status } = useSelector((state) => state.user);
  console.log(data.studio.studios);

  const [studios, setStudios] = useState([]);
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
  //   const getMovie = async (movie_id) => {
  //     const movie = await client.get(`api/public/movie-details/${movie_id}`);
  //     console.log(movie.data);
  //     setImgScreening(movie.data.img);
  //     return movie.data;
  //   };
  const [imgScreenings, setImgScreenings] = useState([]);
  const [filteredScreenings, setFilteredScreenings] = useState([]);
  const [tanggal, setTanggal] = useState(null);
  const [kota, setKota] = useState(null);
  const [cabang, setCabang] = useState(null);
  const [loading, setLoading] = useState(true);

  const [movieData, setMovieData] = useState({
    imgScreenings: [],
    filteredScreenings: [],
  });
  const getMovie = async (movie_id) => {
    try {
      const movie = await client.get(`api/public/movie-details/${movie_id}`);
      console.log(movie.data);
      return movie.data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  };
  const findStudio = (studio_id) => {
    console.log(studios);
    const foundStudio = studios.find((studio) => studio._id === studio_id);
    return foundStudio.studio_name;
  };

  useEffect(() => {
    setStudios(data.studio.studios);
  }, [data.studio.studios]);
  //filter by tanggal no 2
  useEffect(() => {
    const fetchMovieImages = async () => {
      setLoading(true);

      const imgPromises = data.jadwal.screenings
        .filter(
          (screening) =>
            !tanggal ||
            new Date(screening.showtime).toLocaleDateString() ===
              new Date(tanggal).toLocaleDateString()
        )
        .map(async (screening) => {
          const movieImg = await getMovie(screening.movie);
          return movieImg;
        });

      const movieImages = await Promise.all(imgPromises);
      setImgScreenings(movieImages);

      const screeningsOnSelectedDate = data.jadwal.screenings.filter(
        (screening) =>
          !tanggal ||
          new Date(screening.showtime).toLocaleDateString() ===
            new Date(tanggal).toLocaleDateString()
      );
      setFilteredScreenings(screeningsOnSelectedDate);

      setLoading(false);
    };

    fetchMovieImages();
  }, [data.jadwal.screenings, tanggal]);

  //filter by tanggal no 1
  // useEffect(() => {
  //   const fetchMovieImages = async () => {
  //     const imgPromises = data.jadwal.screenings
  //       .filter(
  //         (screening) =>
  //           !tanggal ||
  //           new Date(screening.showtime).toLocaleDateString() ===
  //             new Date(tanggal).toLocaleDateString()
  //       )
  //       .map(async (screening) => {
  //         const movieImg = await getMovie(screening.movie);
  //         return movieImg;
  //       });

  //     const movieImages = await Promise.all(imgPromises);
  //     setImgScreenings(movieImages);

  //     const screeningsOnSelectedDate = data.jadwal.screenings.filter(
  //       (screening) =>
  //         !tanggal ||
  //         new Date(screening.showtime).toLocaleDateString() ===
  //           new Date(tanggal).toLocaleDateString()
  //     );
  //     setFilteredScreenings(screeningsOnSelectedDate);
  //   };

  //   fetchMovieImages();
  // }, [data.jadwal.screenings, tanggal]);

  // useEffect(() => {
  //   const fetchMovieImages = async () => {
  //     const imgPromises = data.jadwal.screenings.map(async (screening) => {
  //       const movieImg = await getMovie(screening.movie);
  //       return movieImg;
  //     });

  //     const movieImages = await Promise.all(imgPromises);
  //     console.log(movieImages);
  //     setImgScreenings(movieImages);
  //   };

  //   fetchMovieImages();
  // }, [data.jadwal.screenings]);
  console.log(imgScreenings);

  if (loading || !filteredScreenings.length) {
    // Display the loading message or no screenings found message
    return (
      <>
        <div className="flex gap-3">
          <div>
            <p>Tanggal</p>
            <input
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              type="date"
              onChange={(e) => {
                setTanggal(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city" className="">
              Kota
            </label>
            <select
              id="city"
              defaultValue={""}
              autoFocus
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setKota(e.target.value);
              }}
            >
              <option value="">Pilih Kota</option>
              {kotaDanKabupaten.map((k, index) => (
                <option key={index} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="">
              Cabang
            </label>
            <select
              id="city"
              defaultValue={""}
              autoFocus
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setCabang(e.target.value);
              }}
            >
              <option value="">Pilih Cabang</option>
              {data.cabang.branches.map((c, index) => (
                <option key={index} value={c.branch_name}>
                  {c.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p>
          {loading
            ? "Loading..."
            : "Tidak ditemukan jadwal sesuai dengan filter tanggal."}
        </p>
      </>
    );
  }

  return (
    <div className="w-full px-12 py-5">
      <p className="text-2xl font-bold mb-5">Filter Jadwal</p>
      <div className="flex justify-between gap-2 mb-5">
        <div className="flex gap-3">
          <div>
            <p>Tanggal</p>
            <input
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              type="date"
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
              }}
              onBlur={(e) => {
                setTanggal(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city" className="">
              Kota
            </label>
            <select
              id="city"
              defaultValue={""}
              autoFocus
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setKota(e.target.value);
              }}
            >
              <option value="">Pilih Kota</option>
              {kotaDanKabupaten.map((k, index) => (
                <option key={index} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="">
              Cabang
            </label>
            <select
              id="city"
              defaultValue={""}
              autoFocus
              className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setCabang(e.target.value);
              }}
            >
              <option value="">Pilih Cabang</option>
              {data.cabang.branches.map((c, index) => (
                <option key={index} value={c.branch_name}>
                  {c.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/cineplex/jadwal/create-screening"
            className="p-2 biruCariTiket  text-white rounded"
          >
            Tambah Screening
          </Link>
        </div>
      </div>
      {/* kalo mau pake filter by tanggal  pake filteredScreening, kalo default pake data.jadwal.screenings*/}

      {loading && <p>Loading...</p>}
      {!loading && filteredScreenings.length === 0 ? (
        <p>Tidak ditemukan jadwal sesuai dengan filter tanggal.</p>
      ) : (
        filteredScreenings.map((screening, index) => {
          // ... (existing code)
          return (
            <div className="" key={index}>
              <div className="flex shadow-2xl mb-5">
                {/* http://localhost:3000/cineplex/npwp-6566e2382d4522b6ed7c227a.jpg */}
                <img src={imgScreenings[index].img} alt="" className="w-48" />
                <div className="p-5  w-full">
                  <p className="font-bold text-2xl">
                    {findStudio(screening.studio)}
                  </p>
                  <p className="font-bold text-xl">
                    {imgScreenings[index].title}
                  </p>
                  <table>
                    <tr>
                      <td>Tanggal </td>
                      <td>:{screening.showtime.substring(0, 10)}</td>
                      {/* <td>:{screening.showtime}</td> */}
                    </tr>
                    <tr>
                      <td>Rating Usia </td>
                      <td> :{imgScreenings[index].age_rating}</td>
                    </tr>
                    <tr>
                      <td>Durasi </td>
                      <td>
                        :{Math.floor(imgScreenings[index].runtime_minutes / 60)}{" "}
                        Jam{" "}
                        {Math.floor(imgScreenings[index].runtime_minutes % 60)}{" "}
                        Menit
                      </td>
                    </tr>
                    <tr>
                      <td>Harga </td>
                      <td>: Rp. {screening.price}</td>
                    </tr>
                    <tr>
                      <td>ID Jadwal</td>
                      <td>: {screening._id}</td>
                    </tr>
                    <tr>
                      <td>Jam </td>
                      <td>
                        :
                        <span className="p-1 bg-gray-500 rounded ml-1">
                          {new Date(screening.showtime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <div className="mt-9 flex justify-between">
                    <div></div>
                    <Link
                      className="biruCariTiket p-2 text-white rounded"
                      to={`/cineplex/edit-menu/`}
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
