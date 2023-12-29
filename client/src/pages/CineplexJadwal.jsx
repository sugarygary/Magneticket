import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";
import client from "../util/client";

export default function CineplexJadwal() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { current_user, status } = useSelector((state) => state.user);
  console.log(data);

  const [studios, setStudios] = useState([]);
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "CINEPLEX") &&
      status == "succeeded"
    ) {
      navigate("/cineplex/login", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "CINEPLEX") &&
    status == "succeeded"
  ) {
    navigate("/cineplex/login", { replace: true });
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
  const [uniqueBranchNames, setUniqueBranchNames] = useState(
    Array.from(
      new Set(data.screenings.map((c) => c.branch.branch_name.toLowerCase()))
    )
  );
  const handleFilter = () => {
    // Filter screenings based on selected filters
    const filtered = data.screenings.filter((screening) => {
      // Filter by date
      if (
        tanggal &&
        screening.showtime.substring(0, 10).toLowerCase() !==
          tanggal.toLowerCase()
      ) {
        return false;
      }

      // Filter by city
      if (kota && screening.branch.city.toLowerCase() !== kota.toLowerCase()) {
        return false;
      }

      // Filter by branch
      if (
        cabang &&
        screening.branch.branch_name.toLowerCase() !== cabang.toLowerCase()
      ) {
        return false;
      }

      return true;
    });

    setFilteredScreenings(filtered);

    setUniqueBranchNames(uniqueBranchNames);
  };
  useEffect(() => {
    // Call the filter function when the filters change
    handleFilter();
  }, [tanggal, kota, cabang]);
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
              {uniqueBranchNames.map((branchName, index) => (
                <option key={index} value={branchName}>
                  {branchName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="mt-8">
          <Link
            to="/cineplex/jadwal/create-screening"
            className="p-2 biruCariTiket  text-white rounded"
          >
            Tambah Screening
          </Link>
        </div> */}
      </div>
      {/* kalo mau pake filter by tanggal  pake filteredScreening, kalo default pake data.jadwal.screenings*/}

      {/* {loading && <p>Loading...</p>} */}
      {filteredScreenings.length === 0 && (
        <p>No screenings found based on the selected filters.</p>
      )}
      {filteredScreenings.map((screening, index) => {
        // ... (existing code)
        return (
          <div className="" key={index}>
            <div className="flex shadow-2xl mb-5">
              {/* http://localhost:3000/cineplex/npwp-6566e2382d4522b6ed7c227a.jpg */}
              <img src={screening.movie.img} alt="" className="w-48" />
              <div className="p-5  w-full">
                <p className="font-bold text-2xl">
                  {screening.studio.studio_name}
                </p>
                <p className="font-bold text-xl">{screening.movie.title}</p>
                <table>
                  <tr>
                    <td>Tanggal </td>
                    <td>:{screening.showtime.substring(0, 10)}</td>
                    {/* <td>:{screening.showtime}</td> */}
                  </tr>
                  <tr>
                    <td>Rating Usia </td>
                    <td> :{screening.movie.age_rating}</td>
                  </tr>
                  <tr>
                    <td>Durasi </td>
                    <td>
                      :{Math.floor(screening.movie.runtime_minutes / 60)} Jam{" "}
                      {Math.floor(screening.movie.runtime_minutes % 60)} Menit
                    </td>
                  </tr>
                  <tr>
                    <td>Harga </td>
                    <td>
                      :{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(screening.price)}
                    </td>
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

                {/* <div className="mt-9 flex justify-between">
                  <div></div>
                  <Link
                    className="biruCariTiket p-2 text-white rounded"
                    to={`/cineplex/edit-menu/`}
                  >
                    Lihat Detail
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
