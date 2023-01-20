import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useMemo } from 'react';
import Loading from '../../components/shared/Loading';

const ContactUs = () => {
    const certer = useMemo(()=>({lat: 44, lng: -88}),[])
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    if(!isLoaded){
        return <Loading/>
    }
    return (
        <div>            
            <h2 className='text-xl underline text-center'>Contact Us</h2>
            <div>
                <GoogleMap zoom={10} center={certer} mapContainerClassName="map-container">
                <Marker position={certer}/>
                </GoogleMap>                
            </div>
        </div>
    );
};

export default ContactUs;