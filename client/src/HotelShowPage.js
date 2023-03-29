import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function HotelShowPage () {

    const location = useLocation();
    const navigate = useNavigate();

    const hotel = location.state.hotel;

    return (
        <div className='App'>
            <div className='App-header'>
                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                <p>{hotel.description}</p>
                <img className="hotel-pic" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
            </div>
            
        </div>
    )

}


export default HotelShowPage;