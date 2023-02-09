import HeroSlider, { Nav, Slide } from "hero-slider";
import React from 'react';
import Rainy from '../../asstes/images/Rainy.jpeg';


// const sliderImages = [
//     `http://bimtian.org/images/bimt_jetty_gate_new.jpg`,
//     `http://bimtian.org/images/Rainy.jpeg`,
//     `http://bimtian.org/images/BIMT_LOGO.jpeg`,
//     'http://bimtian.org/images/Campus.jpeg',
// ];

const HeroSliderContainer = () => {
    const sliderImages = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5FtnThvMfmEE_AlK050oAw5z-7dcEsBq6cXgKMNaNeYEDSKIhHDYVMF2cqgRSoQEB7o&usqp=CAU',
        Rainy,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHB1uAEm-ervbIpA_9_Q32XCohX6hqDBWQhjEp51xLN_Uf8Wjh3l1f5rER_MFry4gty7c&usqp=CAU',
        'https://en.wikipedia.org/wiki/Bangladesh_Institute_of_Marine_Technology#/media/File:BIMT_New_Hostel.jpg',
    ];
    return (
        <div>
            <HeroSlider>
                {sliderImages.map((slider, slideIndex) => <Slide
                    key={slideIndex}
                    background={{
                        backgroundImage: slider,
                        backgroundAttachment: "fixed"
                    }}
                />)}
                <Nav />
            </HeroSlider>
        </div>
    );
};

export default HeroSliderContainer;