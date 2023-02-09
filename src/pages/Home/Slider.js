import React, { useState } from 'react';

const Slider = () => {
    const sliderImages = [
        { url: 'http://localhost:3000/images/bimt_jetty_gate_new.jpg', title: 'BIMT_Jetty' },
        { url: 'http://localhost:3000/images/Rainy.jpeg', title: 'BIMT_Rainy' },
        { url: 'http://localhost:3000/images/BIMT_LOGO.jpeg', title: 'BIMT_Logo' },
        { url: 'http://localhost:3000/images/Campus.jpeg', title: 'BIMT_Campus' },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const sliderStyle = {
        height: '100%',
        position: 'relative'
    };
    const slideStyle = {
        height: '100%',
        width: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${sliderImages[currentIndex].url})`,
    };
    const prevBtnStyle={
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
        opacity: '0.5'
    };
    const nextBtnStyle={
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
        opacity: '0.5'
    };

    const dotStyle = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '20px'
    };
    
    const handlePrev = () =>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? sliderImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const handleNext = () =>{
        const isLastSlide = currentIndex === sliderImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    const goToSlide = (slIndex) =>{
        setCurrentIndex(slIndex)
    }
    return (
        <div style={sliderStyle}>
            <div style={prevBtnStyle} onClick={handlePrev}>⇦</div>
            <div style={nextBtnStyle} onClick={handleNext}>⇨</div>
            <div style={slideStyle}></div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {sliderImages.map((slide, slideIndex)=><div style={dotStyle} key={slideIndex} onClick={()=>goToSlide(slideIndex)}>
                    {slideIndex !== currentIndex ? <span>⚪</span> : <span>⚫</span>}
                </div>)}
            </div>
        </div>
    );
};

export default Slider;