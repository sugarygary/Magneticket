import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import CardDetailEvent from "../components/CardDetailEvent";
// import CardDetailEvent from '../components/CardDetailEvent'

const EventDetail = () => {
  const dataLoader = useLoaderData();
  let data = dataLoader.detailEvent;
  console.log(data);
  let data2 = dataLoader.categoryEvent;
  console.log(data2);
  // console.log("ini data loader",dataLoader)
  return (
    <div className="px-10 py-5">
      <CardDetailEvent {...data}></CardDetailEvent>
      <table className="min-w-full text-white table-auto text-center">
        <thead>
          <tr className="bg-gray-200 bg-gray-700">
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Ticket Remaining</th>
          </tr>
        </thead>
        <tbody className="biruTua">
          {data2.map((category) => (
            <tr key={category.category_name}>
              <td className="border-t border-b py-2 px-4">
                {category.category_name}
              </td>
              <td className="border-t border-b py-2 px-4">{category.price}</td>
              <td className="border-t border-b py-2 px-4">
                {category.ticketLeft > 0 && category.ticketLeft}
                {category.ticketLeft <= 0 && "SOLD OUT"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetail;
