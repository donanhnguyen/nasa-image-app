import {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';

function HotelShowPage () {

    const location = useLocation();
    const navigate = useNavigate();
    const contextInfo = useContext(GlobalContext);
    const {currentUserState, setCurrentUserState} = contextInfo;

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
                    <h1 className='price'>${room.price}</h1>

                    {/* show if the room is avail here or not, based on unavailableDates array */}

                    {
                        currentUserState ? 
                        <button>Book</button> 
                        : 
                        <p>Please log in before booking.</p>
                    }
                    
                </div>
            )
        })
        return displayedRooms;
    }

    function backtoresults () {
        navigate('/search');
    }

    return (
        <div className='App'>
            <div className='App-header'>
                
                <button onClick={backtoresults}
                className='btn btn-danger'>Back to search results</button>

                <br/>

                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                <p>{hotel.description}</p>
                <img className="hotel-pic-in-show-page" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>

                {/* display rooms */}
                <p>Rooms:</p>
                <div className='displayed-rooms-container'>
                    {displayRooms()}
                </div>

            </div>

           
            
        </div>
    )

}


export default HotelShowPage;