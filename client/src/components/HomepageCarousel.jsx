import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomepageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div>
          <img
            src="https://media.21cineplex.com/webcontent/gallery/pictures/165209081845156_925x527.jpg"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <div>
          <img
            src="https://media.21cineplex.com/webcontent/gallery/pictures/167652365439081_925x527.jpg"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <div>
          <img
            src="https://media.21cineplex.com/webcontent/gallery/pictures/158251458710331_926x528.jpg"
            alt=""
            className="w-full h-auto"
          />
        </div>
      </Slider>
    </div>
  );
}
