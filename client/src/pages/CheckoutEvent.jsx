import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import openheimer from "../assets/openheimer.jpg";
import { useState } from "react";
import client from "../util/client";
import { useEffect } from "react";

const CheckoutEvent = () => {
  const dataLoader = useLoaderData();
  let data = dataLoader.detailEvent;
  let data2 = dataLoader.categoryEvent;
  if (dataLoader.detailEvent == "Request failed with status code 401") {
    throw new Response("", { status: 401 });
  }

  const [selectedCategory, setSelectedCategory] = useState(data2[0]._id);
  const [quantity, setQuantity] = useState(1);
  const [tleft, setTleft] = useState(data2[0].ticketLeft);
  const [total, setTotal] = useState(data2[0].price);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    data2.map((category) => {
      if (category._id == e.target.value) {
        setTleft(category.ticketLeft);
        setTotal(category.price * quantity);
      }
    });
  };
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 4) {
      setQuantity(value);
      let tempharga = 0;
      data2.map((category) => {
        if (category._id == selectedCategory) {
          tempharga = category.price;
        }
      });
      tempharga = tempharga * value;
      setTotal(tempharga);
    }
  };
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  async function bayar() {
    let snapBody = {
      event_category: selectedCategory,
      quantity: quantity,
    };
    let snapData;
    try {
      snapData = await client.post("/api/user/create-snap-event", snapBody);
    } catch (error) {
      console.log(error.message);
    }
    let bayarTiket = {
      order_id: snapData.data.order_id,
      event_category: selectedCategory,
      quantity: quantity,
      midtrans_token: snapData.data.token,
    };
    window.snap.pay(snapData.data.token, {
      onSuccess: async function (result) {
        // let ticket = await client.post("api/user/create-ticket", requestBody);
        let checkout = await client.post("api/user/create-transaction-event", {
          ...bayarTiket,
          status: "SUCCESS",
        });
        console.log(checkout);
      },
      onPending: async function (result) {
        let checkout = await client.post("api/user/create-transaction", {
          ...bayarTiket,
          status: "PENDING",
        });
        alert("wating your payment!");
      },
      onError: async function (result) {
        let checkout = await client.post("api/user/create-transaction", {
          ...bayarTiket,
          status: "FAILED",
        });
        alert("payment failed!");
      },
      onClose: async function () {
        alert("you closed the popup without finishing the payment");
      },
    });
  }
  return (
    <div className="px-10 py-5">
      <div className="container mx-auto mt-8  text-white p-4">
        <div className="mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <div className="flex mb-5">
              <div className="me-5">
                <img src={openheimer} alt="" className="w-48 rounded" />
              </div>
              <div className="">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Event Name</h3>
                  <p className="text-gray-400">{data.event_name}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Event Description</h3>
                  <p className="text-gray-400">{data.event_description}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Venue</h3>
                  <p className="text-gray-400">{data.venue}</p>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
              >
                {data2.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-300"
              >
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max={tleft < 4 ? tleft : 4}
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
              />
              {tleft <= 0 && (
                <p className="text-red-500 text-sm mt-1">Ticket is sold out</p>
              )}
              {tleft > 0 && (
                <p className="text-white text-sm mt-1">Ticket Left: {tleft}</p>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-right">
                Total : {total}
              </h3>
            </div>
            <div className="flex justify-center">
              <button
                onClick={bayar}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEvent;
