import {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';

function HotelShowPage () {

    const location = useLocation();
    const navigate = useNavigate();
    const contextInfo = useContext(GlobalContext);
    const {currentUserState, 
        isRoomAvailableOrNot, 
        dateRangeArray,
        localHost,
        renderURL
    } = contextInfo;

    const [hotelRoomsState, setHotelRoomsState] = useState([]);

    const hotel = location.state.hotel;

    useEffect(() => {
        Axios.get(`${renderURL}/api/hotels/${hotel._id}/rooms/`)
            .then((response) => {
                setHotelRoomsState(response.data);
            })
    }, [])

    function navigateToConfirmBookingPage (room) {
        navigate('/ConfirmBookingPage', {state: {room: room, hotel: hotel} }); 
    }

    function displayBookButtonAndIfItsAvailableOrNot (room) {
    
        if (currentUserState && dateRangeArray && isRoomAvailableOrNot(dateRangeArray, room.unavailableDates)) {
            return <button 
                        className='btn btn-danger btn-lg'
                        onClick={() => {navigateToConfirmBookingPage(room)}}
                    >Book
                    </button>
        } else if (!isRoomAvailableOrNot(dateRangeArray, room.unavailableDates)) {
            return <p style={{color: 'red'}}>Unavailable</p>
        } 
    }

    function displayRooms () {
        const displayedRooms = hotelRoomsState.map((room, i) => {
            return (
                <div className='single-room-displayed' key={room + i}>
                    <h1>{room.name}</h1>
                    <h1 className='price'>${room.price}</h1>

                    {/* show if the room is avail here or not, based on unavailableDates array */}

                    {displayBookButtonAndIfItsAvailableOrNot(room)}

                    
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
            <div className='hotel-show-container'>
                
                <button onClick={backtoresults}
                className='btn btn-danger btn-lg back-to-search-results-button'>Back to search results</button>

                {
                    dateRangeArray ?
                    <h1>Selected Duration: {dateRangeArray[0]} - {dateRangeArray[dateRangeArray.length-1]}</h1>
                    :
                    ""
                }

                <h1>{hotel.name}</h1>
                <h1>Planet: {hotel.planet}</h1>
                <p className='hotel-description-in-show-page'>{hotel.description}</p>
                <img className="hotel-pic-in-show-page animate__animated animate__zoomIn" 
                src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}>  
                </img>

                {/* display rooms */}
                <h2>Rooms:</h2>
                {currentUserState ? <h1></h1> : <h1 style={{backgroundColor: 'black', color: 'red'}}>Please Log In To Book.</h1>}
                <div className='displayed-rooms-container'>
                    
                    {displayRooms()}
                </div>

            </div>

           
            
        </div>
    )

}


export default HotelShowPage;