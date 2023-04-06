import {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import Loader from './Loader';
import './FancyButtons.css';

function ConfirmBookingPage () {
    const location = useLocation();
    const navigate = useNavigate();
    const contextInfo = useContext(GlobalContext);
    const {currentUserState, 
        dateRangeArray,
        localHost,
        renderURL
    } = contextInfo;
    const {room, hotel} = location.state;

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingConfirmationNumber, setBookingConfirmationNumber] = useState(null);

    var bookingDetailsObject = {
        nameOfHotel: hotel.name,
        nameOfRoom: room.name,
        totalPrice: dateRangeArray.length * room.price,
        planet: hotel.planet,
        dates: dateRangeArray,
        userId: currentUserState._id,
        roomId: room._id
    }

    function confirmBooking () {
        setIsLoading(true);

        Axios.post(`${renderURL}/api/users/${currentUserState._id}/bookings/`, bookingDetailsObject)
            .then((response) => {
              setBookingConfirmationNumber(response.data._id);
            })
        Axios.put(`${renderURL}/api/hotels/rooms/${room._id}`, 
        {unavailableDates: room.unavailableDates.concat(dateRangeArray)});

        setTimeout(() => {
            setIsLoading(false);
            setIsConfirmed(true)
        }, 3000);
    }

    if (isLoading) {
        return (
            <div>
                <h1 style={{color: 'white'}}>Confirming your booking, hang tight...</h1>
                <Loader/>
            </div>
        )
    } else if (isConfirmed) {
        return (
            <div className='isConfirmed-container'>
                <h1>You are confirmed!</h1>
                <p>Your booking confirmation number is: {bookingConfirmationNumber}</p>
                <p>We are excited to see you!</p>
            </div>
        )
    } else {
        return (
            <div className='confirmation-container'>

                <h1>Confirming booking for: {hotel.name}</h1>
                <h1>Duration: {dateRangeArray[0]} - {dateRangeArray[dateRangeArray.length-1]}</h1>

                <img className="hotel-pic-in-confirm-page" 
                    src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}>  
                </img>


                <p>Total price for {dateRangeArray.length} days: ${dateRangeArray.length * room.price}</p>
                
                <button onClick={confirmBooking} className='confirm-booking-button'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Confirm Booking
                </button>

            </div>
        )  
    }

}

export default ConfirmBookingPage;