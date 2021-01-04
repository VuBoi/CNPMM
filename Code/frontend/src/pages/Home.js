import React from 'react';
//
import SliderHome from '../components/Home/SliderHome';
import FeaturesBox from '../components/Home/FeaturesBox';
import TopCourse from '../components/Home/TopCourse';

export default function Home(props){
    return(
        <div className="home-page">
            <SliderHome />
            <FeaturesBox />
            <hr></hr>
            <TopCourse />
        </div>
    )
}