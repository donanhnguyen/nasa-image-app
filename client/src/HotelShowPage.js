import {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';

function HotelShowPage () {

    const location = useLocation();
    const navigate = useNavigate();
    const contextInfo = useContext(GlobalContext);
    const {currentUserState, 
        setCurrentUserState, 
        isRoomAvailableOrNot, 
        dateRangeArray
    } = contextInfo;

    const [hotelRoomsState, setHotelRoomsState] = useState([]);

    const hotel = location.state.hotel;

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/${hotel._id}/rooms/`)
            .then((response) => {
                setHotelRoomsState(response.data);
            })
    }, [])

    function displayBookButtonAndIfItsAvailableOrNot (roomDates) {
    
        if (currentUserState && dateRangeArray && isRoomAvailableOrNot(dateRangeArray, roomDates)) {
            return <button className='btn btn-danger btn-lg'>Book</button>
        } else if (!isRoomAvailableOrNot(dateRangeArray, roomDates)) {
            return <p style={{color: 'red'}}>Unavailable</p>
        } else {
            return <p>Please log in before booking.</p>
        }
            
        
    }

    function displayRooms () {
        const displayedRooms = hotelRoomsState.map((room, i) => {
            return (
                <div className='single-room-displayed' key={room + i}>
                    <h1>{room.name}</h1>
                    <h1 className='price'>${room.price}</h1>

                    {/* show if the room is avail here or not, based on unavailableDates array */}

                    {displayBookButtonAndIfItsAvailableOrNot(room.unavailableDates)}

                    
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
                className='btn btn-danger back-to-search-results-button'>Back to search results</button>

                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                <p>{hotel.description}</p>
                <img className="hotel-pic-in-show-page animate__animated animate__zoomIn" 
                src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}>  
                </img>

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