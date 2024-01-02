import { number } from "joi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function CineplexListStudios() {
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);
  if (data.response && data.response.status == 401) {
    throw new Response("", { status: 401 });
  }
  console.log(data.responseStudio.studios);
  const matchingBranch = data.responseCabang.branches.find(
    (branch) => branch._id === data.currentCabang
  );
  console.log(matchingBranch);

  const { current_user, status } = useSelector((state) => state.user);
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
  return (
    <div className=" w-full h-full justify-center items-center text-white my-10">
      <div className="biruTua p-5 text-center rounded w-3/4 mx-auto mb-5">
        <div className="flex justify-between">
          <p className="text-2xl font-bold text-left mb-5">
            {matchingBranch.branch_name}
          </p>
          <Link to={`create-studio`} className="biruMuda h-fit  rounded  p-2">
            Tambah Studio
          </Link>
        </div>

        {data.responseStudio.studios.map((studio, index) => {
          const numbersArray = studio.seating_layout.split("-").map(Number);
          console.log(numbersArray);
          let temp = 0;
          for (let i = 0; i < numbersArray.length; i++) {
            temp = numbersArray[i] + temp;
          }
          console.log(temp);
          let totalKursiBaris = studio.row * temp;
          return (
            <div className="mb-1 p-2 abuInput rounded">
              <div className="flex justify-between">
                <p className=" p-2 ">
                  {studio.studio_name} - {studio.type} ({totalKursiBaris} Seats)
                </p>
                <Link
                  to={`/cineplex/studios/${data.currentCabang}/create-screening/${studio._id}`}
                  className="bg-blue-900 rounded ml-auto px-2 py-1"
                  id={studio._id + " - " + studio.studio_name}
                >
                  {" "}
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
