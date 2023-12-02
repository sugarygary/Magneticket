import { Link } from "react-router-dom";
const CardHome = (props) => {
  return (
    <div className="biruTua snap-start w-24 md:w-48 mt-5 mb-2 text-center flex-none rounded">
      <img
        src={props.movie.img}
        alt=""
        className="aspect-[2/3] object-center w-full rounded"
      />
      <div className="text-white py-3 px-2">
        <p
          title={props.movie.title}
          className="font-bold hover:underline cursor-default text-xs md:text-lg truncate mb-2"
        >
          {props.movie.title}
        </p>
        <Link
          to={`/user/film/${props.movie._id}/screening`}
          className="biruCariTiket text-[.6rem] md:text-lg rounded p-1 px-2 mb-2"
        >
          Cari Tiket ➡
        </Link>
      </div>
    </div>
  );
};

export default CardHome;
