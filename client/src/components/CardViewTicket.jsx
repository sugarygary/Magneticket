import moment from "moment-timezone";
import { Link } from "react-router-dom";
const CardViewTicket = (props) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const indonesianMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return (
    <div className="rounded ps-8 mb-4 mt-1 pe-4 ticket w-auto h-full font-magneticket block md:flex">
      <div className="flex items-center w-full pe-4 py-2">
        <div className="w-full md:ml-2 sm:ml-2 ml-2">
          <p className="font-bold mt-2 text-3xl">
            {props.transaction.movie_title}
          </p>
          <table className="text-xl">
            <tbody>
              <tr>
                <td className="align-top">
                  <p className="abu9CA3AF">Tanggal</p>
                </td>
                <td>
                  <p className="ml-3 sm:ml-8">
                    {
                      days[
                        moment(props.screening.showtime)
                          .tz("Asia/Jakarta")
                          .day()
                      ]
                    }
                    {moment(props.screening.showtime)
                      .tz("Asia/Jakarta")
                      .format(", DD ")}
                    {
                      indonesianMonths[
                        moment(props.screening.showtime)
                          .tz("Asia/Jakarta")
                          .month()
                      ]
                    }
                    {moment(props.screening.showtime)
                      .tz("Asia/Jakarta")
                      .format(" YYYY")}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="align-top">
                  <p className="abu9CA3AF">Jam</p>
                </td>
                <td>
                  <p className="ml-3 sm:ml-8">
                    {moment(props.screening.showtime)
                      .tz("Asia/Jakarta")
                      .format("HH:mm")}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="align-top">
                  <p className="abu9CA3AF">Bioskop</p>
                </td>
                <td>
                  <p className="ml-3 sm:ml-8">
                    {props.transaction.branch_name}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="align-top">
                  <p className="abu9CA3AF">Studio</p>
                </td>
                <td>
                  <p className="ml-3 sm:ml-8">
                    {props.transaction.studio_name}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="abu9CA3AF">Kursi</p>
                </td>
                <td>
                  <p className="ml-3 sm:ml-8">
                    {props.transaction.seats.join(",")} (
                    {props.transaction.seats.length})
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <img
          src={props.transaction.movie_img}
          alt=""
          className="w-32 aspect-[2/3] hidden sm:block md:block h-auto rounded"
        />
      </div>
      <div className="border-[#9CA3AF] py-4 border-t-2 md:border-t-0 md:border-l-2 border-dashed text-center w-full md:w-72">
        <div className="flex justify-center items-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${props._id}&amp;size=100x100`}
            alt=""
            className="w-32 cursor-zoom-in"
            draggable="false"
            onClick={props.setZoomPointer}
          />
        </div>
        <Link to={`/user/history/${props.transaction._id}`}>
          <button className="px-5 flex gap-2 items-center mx-auto mt-2 font-biasa py-2 rounded-md biruCariTiket text-white">
            <div>Lihat Detail</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardViewTicket;
