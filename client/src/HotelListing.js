import { useLocation, useNavigate, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';

function HotelListing (props) {

    const {hotel, navigateToHotelShowPage} = props;
    const [roomsState, setRoomsState] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/${hotel._id}/rooms`)
            .then((response) => {
                setRoomsState(response.data);
            })
    }, [])

    function getStartingPrice () {
        var res = Math.min.apply(Math, roomsState.map(function(o) { 
			return o.price; }));
        return res;   
    }

    function countHowManyAvailableRooms () {
        return <p># of avail. rooms here</p>
    }

    return (
        <div onClick={() => navigateToHotelShowPage(hotel)} 
            className="single-hotel-displayed" 
            >
            <h1>{hotel.name}</h1>
            <h1>Planet: {hotel.planet}</h1>
            <img className="hotel-pic-in-search-page" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
            <h1>
                Rooms starting at 
                {
                    roomsState.length !== 0 ?
                    <p className="price">$ {getStartingPrice()} per night</p> 
                    :
                    ""
                }
            
            </h1>
            <h1>
                {/* show how many avail rooms here */}
                {
                    countHowManyAvailableRooms()
                }
            </h1>
        </div>
    )
}


export default HotelListing;