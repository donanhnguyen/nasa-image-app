import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';

function HotelShowPage () {

    const location = useLocation();
    const navigate = useNavigate();

    const [hotelRoomsState, setHotelRoomsState] = useState([]);

    const hotel = location.state.hotel;

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/${hotel._id}/rooms/`)
            .then((response) => {
                setHotelRoomsState(response.data);
            })
    }, [])

    function displayRooms () {
        const displayedRooms = hotelRoomsState.map((room, i) => {
            return (
                <div className='single-room-displayed' key={room + i}>
                    <h1>{room.name}</h1>
                    <h1>${room.price}</h1>
                    <button>Book</button>
                </div>
            )
        })
        return displayedRooms;
    }

    return (
        <div className='App'>
            <div className='App-header'>
                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                <p>{hotel.description}</p>
                <img className="hotel-pic" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>

                {/* display rooms */}
                <div className='displayed-rooms-container'>
                    {displayRooms()}
                </div>

            </div>

           
            
        </div>
    )

}


export default HotelShowPage;