import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createReview } from "../handlers/UserHandler";

const DetailPesanan = (props) => {
  const navigate = useNavigate();
  const { current_user, status } = useSelector((state) => state.user);
  const [canReview, setCanReview] = useState(true);
  const [rating, setRating] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("order_id")) {
      navigate("/user/history");
    }
    if (
      (current_user.userId == null || current_user.role != "USER") &&
      status == "succeeded"
    ) {
      navigate("/user/login", { replace: true });
    }
    const hasReviewed = props.responseReview !== "";
    setCanReview(!hasReviewed);
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
  if (
    (current_user.userId == null || current_user.role != "USER") &&
    status == "succeeded"
  ) {
    navigate("/user/login", { replace: true });
  }
  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg(null);

    if (rating == null) {
      setErrorMsg("Mohon mengisi bintang");
      return;
    }

    const reviewData = {
      movieId: props.responseHistory.movie_id,
      rating: rating,
    };

    createReview(reviewData);
    window.location.reload();
  }
  async function bayar() {
    window.snap.pay(props.responseHistory.midtrans_token);
  }
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  useEffect(() => {
    setErrorMsg(null);
  }, [rating]);

  return (
    <div className="my-5 rounded shadow-lg p-4 md:p-8 biruTua text-[#f8f8f8] border border-black overflow-x-auto">
      <div className="items-center justify-between md:flex hidden">
        <p className="font-bold text-sm md:text-2xl whitespace-nowrap">
          Ringkasan Pemesanan
        </p>
        <span className="text-right text-xs md:text-xl">
          Nomor Pemesanan: {props.responseHistory._id}
        </span>
      </div>
      <div className="flex items-center justify-center md:hidden block">
        <span className="text-center text-base font-bold md:text-xl">
          #{props.responseHistory._id}
        </span>
      </div>

      <div className="w-full mt-6 block md:flex">
        <div className="">
          <img
            src={props.responseHistory.movie_img}
            alt=""
            className="w-64 mx-auto md:w-48 aspect-[2/3] rounded"
          />
        </div>
        <div className="md:px-5 flex w-full justify-between ">
          <div className="w-full">
            <p className="text-center md:text-left text-xl font-bold mb-2">
              {props.responseHistory.movie_title}
            </p>
            <table className="text-[.7rem] md:text-lg">
              <tbody>
                <tr>
                  <td>Bioskop</td>
                  <td> : </td>
                  <td>{props.responseHistory.branch_name}</td>
                </tr>

                <tr>
                  <td>Tiket</td>
                  <td> : </td>
                  <td>{props.responseHistory.seats.length} Tiket</td>
                </tr>
                <tr>
                  <td>Tempat Duduk</td>
                  <td> : </td>
                  <td>{props.responseHistory.seats.join(", ")}</td>
                </tr>
                <tr>
                  <td>Studio</td>
                  <td> : </td>
                  <td>{props.responseHistory.studio_name}</td>
                </tr>
                <tr>
                  <td>Hari/Tanggal</td>
                  <td> : </td>
                  <td>
                    <p className="">
                      {" "}
                      {moment(props.responseHistory.createdAt)
                        .tz("Asia/Jakarta")
                        .format("dddd, DD-MM-YYYY")}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>Waktu Transaksi</td>
                  <td> : </td>
                  <td>
                    <p className="">
                      {moment(props.responseHistory.createdAt)
                        .tz("Asia/Jakarta")
                        .format("HH:mm")}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="text-left my-2 md:my-3 text-sm md:text-xl font-bold underline underline-offset-4">
        Detail Transaksi
      </p>
      <div className="flex text-xs md:text-xl justify-between">
        <div className="">
          <p>{props.responseHistory.studio_type}</p>
          {props.responseHistory.foods.map((food) => {
            return <p>{food.food_name}</p>;
          })}
          <p>Biaya Layanan</p>
          {(
            <p className="text-red-400">
              {props.responseHistory?.promo?.promo_code}
            </p>
          ) || ""}
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Rp&nbsp;</td>
                <td className="text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                    .format(props.responseHistory.price_per_seat)
                    .substring(3)}
                </td>
                <td>
                  <span className="abu9CA3AF">
                    x {props.responseHistory.seats.length}
                  </span>
                </td>
              </tr>
              {props.responseHistory.foods.map((food) => {
                return (
                  <tr>
                    <td>Rp&nbsp;</td>
                    <td className="text-right">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(food.food_price)
                        .substring(3)}
                    </td>
                    <td>
                      <span className="abu9CA3AF">x {food.quantity}</span>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Rp&nbsp;</td>
                <td className="text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                    .format(4000)
                    .substring(3)}
                </td>
                <td>
                  <span className="abu9CA3AF">
                    x {props.responseHistory.seats.length}
                  </span>
                </td>
              </tr>
              {props.responseHistory.promo != undefined && (
                <tr className="text-red-400">
                  <td>Rp&nbsp;</td>
                  <td className="text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                      .format(props.responseHistory?.promo?.discount_amount)
                      .substring(3)}
                  </td>
                  <td className=""> (-)</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="bg-black h-[0.2rem] text-black rounded-full mt-4" />
      <div className="justify-end text-[.7rem] md:text-lg flex mt-4">
        <p className="font-bold">
          Total Pembayaran :{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(props.responseHistory.amounts_paid)}
        </p>
      </div>
      <div className="justify-center sm:justify-end flex mt-2">
        {props.responseHistory.status == "PENDING" && (
          <button
            className="cursor-pointer w-fit mt-1 biruMuda text-white px-8 py-2 rounded"
            onClick={() => {
              bayar();
            }}
          >
            Bayar
          </button>
        )}
        {canReview && props.responseHistory.status == "SUCCESS" && (
          <form action="" className="mt-5" onSubmit={submitForm}>
            <div className="mb-3 text-left">
              <p>Rating Film:</p>
              <div className="flex gap-1 text-2xl font-light">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      rating >= star
                        ? "star-filled cursor-pointer text-yellow-500"
                        : "star-filled cursor-pointer"
                    }
                    onClick={() => handleStarClick(star)}
                  >
                    {rating >= star ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>

            {errorMsg && <span className="text-red-500">{errorMsg}</span>}
            <div className="mb-3 text-left mt-5">
              <button className="biruMuda w-full rounded p-1 pl-2">
                Submit Review
              </button>
            </div>
          </form>
        )}
        {!canReview && props.responseHistory.status == "SUCCESS" && (
          <div className="w-full justify-center sm:justify-end flex">
            <div>
              <div className="text-lg text-right">Rating Anda : </div>
              <div className="justify-end flex text-2xl">
                {[...Array(props.responseReview.rating)].map((star) => {
                  return (
                    <span
                      key={star}
                      className={"star-filled cursor-default text-yellow-500"}
                    >
                      ★
                    </span>
                  );
                })}
                {[...Array(5 - props.responseReview.rating)].map((star) => {
                  return (
                    <span key={star} className={"star-filled cursor-default"}>
                      ☆
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPesanan;
