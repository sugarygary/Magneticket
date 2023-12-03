const CardTicketByMovie = (props) => {
  return (
    <div className="mt-4 mb-2 rounded biruTua border-4 p-1 border border-[#1f2a37] shadow-lg">
      <div className="flex">
        <img
          src={props.img}
          alt=""
          className="w-32 h-full aspect-[2/3] md:w-40 rounded"
        />
        <div className="text-black pt-3 ml-2 md:ml-4">
          <p className="font-bold text-[#f8f8f8] text-[.75rem] md:text-lg">
            {props.title}
          </p>
          <div className="flex my-1">
            <div className="px-3 py-1 mt-2 bg-[#f8f8f8] rounded">
              <p className="text-black text-[0.6rem] md:text-base">
                {props.age_rating}
              </p>
            </div>
          </div>
          <table className="text-[0.6rem] mt-2 md:text-base">
            <tbody>
              <tr>
                <td className="abu9CA3AF">Sutradara</td>
                <td className="text-[#f8f8f8] ml-4">
                  : {props.director.director_name}
                </td>
              </tr>
              <tr>
                <td className="abu9CA3AF">Durasi</td>
                <td className="text-[#f8f8f8] ml-4">
                  :{" "}
                  {Math.floor(props.runtime_minutes / 60) >= 1 && (
                    <>{Math.floor(props.runtime_minutes / 60)} jam </>
                  )}
                  {Math.floor(props.runtime_minutes) % 60} menit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-2 bg-[#f8f8f8] mt-1  rounded">
        <p className="text-[0.6rem] md:text-base font-bold">Sinopsis</p>
        <p className="text-[0.6rem] text-justify pe-2 md:text-base">
          {props.synopsis}
        </p>
      </div>
    </div>
  );
};

export default CardTicketByMovie;
