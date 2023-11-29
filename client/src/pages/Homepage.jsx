import { Link, useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomepageCarousel from "../components/HomepageCarousel";
import UserRegisterForm from "../components/UserRegisterForm";
import CardHome from "../components/CardHome";
import CardHomeEvent from "../components/CardHomeEvent";

const Homepage = () => {
  const data = useLoaderData();
  console.log("ini datanya",data);
  let loadMovie=data.inTheater;
  let loadEvent=data.ongoingEvent;
  return (
    <>
      <div className="w-full p-10">
        <HomepageCarousel></HomepageCarousel>
      </div>
      <div className="px-10">
        <p className="text-xl sm:text-4xl font-bold">In Theater</p>
        <div className="grid gap-4 justify grid-cols-1 sm:grid-cols-4">
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
        <p className="text-xl sm:text-4xl font-bold">KONSER</p>
        <div className="grid gap-4 justify grid-cols-1 sm:grid-cols-4">
          {
            loadEvent.map((event) => {
              console.log(event);
              return event.events.map((event2) => {
                console.log(event2);
                return (
                  <>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                    <CardHomeEvent {...event2}></CardHomeEvent>
                  </>
                )
              })
            })
          }
          
        </div>
      </div>
    </>
  );
};

export default Homepage;
