import { useLocation, useNavigate, Link} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Axios from 'axios';
import GlobalContext from './GlobalContext';

function HotelListing (props) {

    const contextInfo = useContext(GlobalContext);
    const {dateRangeArray, isRoomAvailableOrNot} = contextInfo;

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
        var numberOfAvailableRooms = 0;
        for (let i in roomsState) {
            let currentRoom = roomsState[i];
            if (isRoomAvailableOrNot(dateRangeArray, currentRoom.unavailableDates)) {
                numberOfAvailableRooms += 1;
            }
        }
        return numberOfAvailableRooms;
    }
    
    if (countHowManyAvailableRooms() > 0) {
      return (
        <div onClick={() => navigateToHotelShowPage(hotel)} 
            className="single-hotel-listing-container" 
            >

            {/* 33.3% */}
            <div className="image-part">
                <img className="hotel-pic-in-search-page" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
            </div>
            
            
            {/* 66.6% */}
            <div className="hotel-listing-info">
                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                
                <h1>
                    Rooms starting at 
                    {
                        roomsState.length !== 0 ?
                        <p className="price">$ {getStartingPrice()} per night</p> 
                        :
                        ""
                    }
                
                </h1>
                {/* # of rooms available */}
                <h1>
                    {dateRangeArray ?  <p style={{color: 'red'}}>Rooms Available: {countHowManyAvailableRooms()}</p> : <p style={{color: 'red'}}>Select dates to see available rooms.</p>}
                </h1>
            </div>
            
        </div>
        )  
    }

    
}


export default HotelListing;