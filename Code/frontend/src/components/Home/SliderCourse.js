import React, { useRef } from 'react';
import Slider from "react-slick";

export default function SliderCourse(props) {
  const { items } = props;
  // 
  const ref = useRef({});
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    rows:1,
    responsive: [
      {
        breakpoint:1200,
        settings:{
          slidesToShow:4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slide-course">
      <Slider ref={ref} {...settings}>
        {items}
      </Slider>
    </div>
  );
}