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
    zIndex: 0,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src="https://web3.21cineplex.com/mobile-banner/msite%20queen.jpg"
          alt=""
          className="w-full h-auto"
        />
      </div>
      <div>
        <img
          src="https://web3.21cineplex.com/mobile-banner/hungergamescombomsite.jpg"
          alt=""
          className="w-full h-auto"
        />
      </div>
      <div>
        <img
          src="https://web3.21cineplex.com/mobile-banner/msite.waspada.jpg"
          alt=""
          className="w-full h-auto"
        />
      </div>
    </Slider>
  );
}
