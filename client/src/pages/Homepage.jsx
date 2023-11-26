import { Link, useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomepageCarousel from "../components/HomepageCarousel";
import UserRegisterForm from "../components/UserRegisterForm";
import CardHome from "../components/CardHome";

const Homepage = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="w-full p-10">
        <HomepageCarousel></HomepageCarousel>
      </div>
      <div className="px-10">
        <p className="text-4xl font-bold">In Theater</p>
        <div className="grid gap-4 justify grid-cols-4">
          {data.map((movie) => {
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
    </>
  );
};

export default Homepage;
