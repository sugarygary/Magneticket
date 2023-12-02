import { Link, useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomepageCarousel from "../components/HomepageCarousel";
import UserRegisterForm from "../components/UserRegisterForm";
import CardHome from "../components/CardHome";
import CardHomeEvent from "../components/CardHomeEvent";

const Homepage = () => {
  const data = useLoaderData();
  let loadMovie = data.inTheater;
  let loadEvent = data.ongoingEvent;
  return (
    <>
      <div className="w-full px-10 mt-24">
        <HomepageCarousel></HomepageCarousel>
        <div className="mt-8">
          <div className="flex items-end justify-between">
            <p className="text-xl sm:text-2xl font-bold">Now Showing</p>
            <Link
              to="/user/film"
              className="text-sm md:text-regular text-blue-600 hover:underline"
            >
              Lihat selengkapnya
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory">
            {loadMovie.map((movie) => {
              return (
                <>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                </>
              );
            })}
          </div>
        </div>
        <p className="text-xl sm:text-4xl font-bold">KONSER</p>
        <div className="grid gap-4 justify grid-cols-1 sm:grid-cols-4">
          {loadEvent.map((event) => {
            return event.events.map((event2) => {
              return (
                <>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                  <CardHomeEvent {...event2}></CardHomeEvent>
                </>
              );
            });
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
