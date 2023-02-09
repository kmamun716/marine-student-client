import React from 'react';
import LoginComp from '../Login/LoginComp';
import Slider from './Slider';

const Home = () => {
    const token = localStorage.getItem('authToken'); 
    const sliderContainer = {
        width: '400px',
        height: '280px',
        margin: '30px auto'
    }
    
    return (
        <div className='grid mt-2 grid-flow-row justify-items-center lg:grid-flow-col gap-4'>
            <div className='lg:col-span-4' style={sliderContainer}>
                <Slider />
            </div>
            <div className='lg:col-span-2 lg:mr-3'>                
                {!token && <><h3 className='text-xl font-bold bg-orange-500 rounded text-center py-2'>Login:</h3><LoginComp/></>}
            </div>
        </div>
    );
};

export default Home;