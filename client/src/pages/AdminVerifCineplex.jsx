import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

function AdminVerifCineplex() {
  const data = useLoaderData();
  const navigate = useNavigate();
  console.log(data.cineplexs);

  const toDetail = (id) => {
    // console.log(id);
    navigate(`/admin/cineplex-verif/${id}`);
  };
  return (
    <div className="px-5 py-10">
      <p className="text-2xl font-bold mb-5">Verifikasi Cineplex</p>

      <table className="min-w-full text-white table-auto">
        <thead>
          <tr className="bg-gray-200 text-left bg-gray-700">
            <th className="py-2 px-4">Company Name</th>
            <th className="py-2 px-4">Brand Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Action</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="biruTua">
          {data.cineplexs.map((data, index) => (
            <tr key={index}>
              <td className="border-t border-b py-2 px-4">
                {data.company_name}
              </td>
              <td className="border-t border-b py-2 px-4">{data.brand_name}</td>
              <td className="border-t border-b py-2 px-4">{data.email}</td>
              <td className="border-t border-b py-2 px-4">
                <button
                  className="biruCariTiket p-2 text-white rounded"
                  onClick={() => toDetail(data._id)}
                  disabled={data.verified}
                >
                  {data.verified == true ? "ACCEPTED" : "DETAIL"}
                </button>
              </td>
              <td className="border-t border-b py-2 px-4">
                {data.verified == true ? "SUKSES" : "PENDING"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminVerifCineplex;
