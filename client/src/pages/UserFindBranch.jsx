import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";
import client from "../util/client";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
export const UserFindBranch = () => {
  const { branches, cineplexes } = useLoaderData();
  let [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  function handleFilterChange(key, value) {
    setSearchParams(
      (prevParams) => {
        if (value === "") {
          prevParams.delete(key);
        } else {
          prevParams.set(key, value);
        }
        return prevParams;
      },
      { replace: true }
    );
  }
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="mt-24 px-10">
      <div className="font-bold text-2xl mb-4">Bioskop Tersedia</div>
      <div className="font-bold mb-1">Filter</div>
      <div className="flex gap-1">
        <div className="w-1/4">
          <label htmlFor="cineplex" className="sr-only">
            Pilih Cineplex
          </label>
          <select
            id="cineplex"
            autoFocus
            defaultValue={
              searchParams.get("cineplex") == null
                ? ""
                : searchParams.get("cineplex")
            }
            onChange={(e) => {
              handleFilterChange("cineplex", e.target.value);
            }}
            className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Cineplex</option>
            {cineplexes.map((c) => (
              <option key={c.brand_name} value={c._id}>
                {c.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="city" className="sr-only">
            Pilih Kota
          </label>
          <select
            id="city"
            autoFocus
            defaultValue={
              searchParams.get("city") == null ? "" : searchParams.get("city")
            }
            onChange={(e) => {
              handleFilterChange("city", e.target.value);
            }}
            className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Kota</option>
            {kotaDanKabupaten.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>
      {state != "idle" && (
        <div className="grid place-items-center mt-12">
          <div role="status" className="">
            <svg
              aria-hidden="true"
              className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
      {state == "idle" && branches.length > 0 && (
        <div className="mt-4">
          {branches.map((b) => (
            <Link className="" to={b._id} key={b._id}>
              <div
                key={b._id}
                className="w-full items-center flex justify-between shadow mb-px rounded biruTua text-[#f8f8f8] py-2.5 px-4 cursor-pointer hover:bg-gray-700"
              >
                <div>{b.branch_name}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
      {state == "idle" && branches.length == 0 && (
        <div className="h-48 md:h-96 grid place-items-center">
          <div className="text-xl">
            <div className="font-bold mb-4 text-4xl">{":("}</div>
            Maaf, hasil pencarian tidak ditemukan.
          </div>
        </div>
      )}
    </div>
  );
};
export async function loadBranches({ request }) {
  let branches, cineplexes;
  const url = new URL(request.url);
  if (url.searchParams.get("city") != null) {
    if (!kotaDanKabupaten.includes(url.searchParams.get("city"))) {
      throw new Response("City not found!", { status: 404 });
    }
  }
  try {
    let params = {
      city: url.searchParams.get("city"),
      cineplex: url.searchParams.get("cineplex"),
    };
    branches = await client.get("api/public/branches", { params });
    cineplexes = await client.get("api/public/cineplexes");
  } catch (error) {
    if (error.response) {
      if (error.response.status == 404) {
        throw new Response("Not found", { status: 404 });
      }
    } else if (error.request) {
      throw new Response("Internal Server Error", { status: 500 });
    }
    return error;
  }

  return { branches: branches.data, cineplexes: cineplexes.data };
}
