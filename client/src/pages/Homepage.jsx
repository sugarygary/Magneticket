import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import HomepageCarousel from "../components/HomepageCarousel";
import CardHome from "../components/CardHome";
import CardHomeEvent from "../components/CardHomeEvent";

const Homepage = () => {
  const data = useLoaderData();
  let loadMovie = data.inTheater;
  let loadEvent = data.ongoingEvent;

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    setScrollStart(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsScrolling(false);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const scroll = x - scrollStart;
    e.currentTarget.scrollLeft = scrollLeft - scroll;
  };

  return (
    <>
      <div
        className="w-full px-10 mt-24 overflow-hidden scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
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
          <div
            className="flex relative overflow-x-auto focus:overflow-x-hidden gap-3 snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollBehavior: "smooth",
              // overflow: "hidden", //kalo mobile tidak bisa scroll
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loadMovie.map((movie) => {
              return (
                <>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
                  <CardHome {...movie}></CardHome>
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
        <div className="mt-8">
          <div className="flex items-end justify-between">
            <p className="text-xl sm:text-2xl font-bold">Event</p>
            <Link
              to="/user/event"
              className="text-sm md:text-regular text-blue-600 hover:underline"
            >
              Lihat selengkapnya
            </Link>
          </div>
          <div
            className="flex relative overflow-x-auto focus:overflow-x-hidden gap-3 snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollBehavior: "smooth",
              // overflow: "hidden", //kalo mobile tidak bisa scroll
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
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
      </div>
    </>
  );
};

export default Homepage;
