import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import client from "../util/client";

export const loadAPIKeyPromotor = async () => {
  try {
    const response = await client.get(`api/promotor/api-key`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const EODocs = () => {
  const { current_user, status } = useSelector((state) => state.user);
  const { api_key } = useLoaderData();
  const [visibleKey, setVisibleKey] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    initFlowbite();
    if (
      (current_user.userId == null || current_user.role != "PROMOTOR") &&
      status == "succeeded"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "PROMOTOR") &&
    status == "succeeded"
  ) {
    navigate("/", { replace: true });
  }
  return (
    <div className="px-10">
      <div className="font-bold text-xl mb-4">Dokumentasi API</div>
      <div className="biruTua p-4 mb-4 rounded text-[#f8f8f8]">
        <div className="mb-2">API Key</div>
        <div className="flex items-center gap-3">
          <input
            type={visibleKey ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readOnly={true}
            defaultValue={api_key}
            required
          ></input>
          <svg
            onClick={() => {
              setVisibleKey(!visibleKey);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            dataslot="icon"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>
      <div id="accordion-collapse" className="mb-20" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 focus:ring-gray-800 border-gray-700 text-gray-400 bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <span>Klaim Tiket</span>
            <svg
              data-accordion-icon=""
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className="hidden"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-5 border border-b-0 border-gray-700 text-[#f8f8f8] bg-gray-900">
            <div className="mb-2">
              Endpoint ini berfungsi untuk proses klaim tiket
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="my-2 text-lg font-bold">
                  <td className="py-2">Request</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Method
                  </th>
                  <td className="px-6 py-4">POST</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    URL
                  </th>
                  <td className="px-6 py-4">
                    {process.env.BACKEND_URL}
                    /partnership/event-organizer/claim-ticket
                  </td>
                </tr>
                <tr className="my-2 text-lg font-bold">
                  <td className="py-2">Body</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    ticket_id
                  </th>
                  <td className="px-6 py-4">
                    ID Tiket yang didapatkan dengan cara scan QR tiket
                  </td>
                </tr>
                <tr className="my-2 text-lg font-bold">
                  <td className="py-2">Header</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Authorization
                  </th>
                  <td className="px-6 py-4 flex gap-3 items-center">
                    &lt;API_KEY&gt;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
