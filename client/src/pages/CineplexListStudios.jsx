import { number } from "joi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function CineplexListStudios() {
  const navigate = useNavigate();
  const data = useLoaderData();

  const matchingBranch = data.responseCabang.branches.find(
    (branch) => branch._id === data.currentCabang
  );

  const { current_user, status } = useSelector((state) => state.user);
  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "CINEPLEX") &&
      status == "succeeded"
    ) {
      navigate("/cineplex/login", { replace: true });
    }
  }, []);

  return (
    <div className="w-full h-full justify-center items-center text-white my-10 px-2">
      <div className="biruTua p-5 text-center rounded w-full sm:w-3/4 mx-auto mb-5">
        <div className="flex justify-between items-center">
          <p className="text-xl sm:text-2xl font-bold text-left mb-5">
            {matchingBranch.branch_name}
          </p>
          <Link to={`create-studio`} className="biruMuda h-fit rounded p-2 text-sm sm:text-base">
            Tambah Studio
          </Link>
        </div>

        {data.responseStudio.studios.map((studio, index) => {
          const numbersArray = studio.seating_layout.split("-").map(Number);
          let temp = 0;
          for (let i = 0; i < numbersArray.length; i++) {
            temp = numbersArray[i] + temp;
          }
          let totalKursiBaris = studio.row * temp;
          return (
            <div className="mb-1 p-2 abuInput rounded">
              <div className="flex justify-between items-center">
                <p className="p-2 text-sm sm:text-base">
                  {studio.studio_name} - {studio.type} ({totalKursiBaris} Seats)
                </p>
                <Link
                  to={`/cineplex/studios/${data.currentCabang}/create-screening/${studio._id}`}
                  className="bg-blue-900 rounded ml-auto px-2 py-1 text-sm sm:text-base"
                  id={studio._id + " - " + studio.studio_name}
                >
                  Create Screening
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
