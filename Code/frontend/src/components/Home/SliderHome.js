import React, {useRef} from 'react';
import Slider from "react-slick";
import '../../assets/css/SliderHome.css';

export default function SliderHome(props) {
    const ref = useRef({});
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false  
    };
    // 
    return (
        <div className="slider-home">
            <Slider ref={ref} {...settings}>
                <div className="banner1"></div>
                <div className="banner2"></div>
            </Slider>
        </div>
    );
}
