import {useEffect, useContext, useReducer, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';

function SingleBooking (props) {


    const {booking, myBookingsDispatch} = props;
    const [singleRoomState, setSingleRoomState] = useState();

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/rooms/${booking.roomId}`)
            .then((response) => {
                setSingleRoomState(response.data)
            })
    }, [])

    function cancelReservation () {

    }

    return (
        <div className='single-booking-container'>

            <div className='booking-first-part'>
                <img className="hotel-pic-my-bookings-page" src={require(`../pics/${booking.nameOfHotel.split(' ').join('')}.jpg`)}></img>
            </div>

            <div className='booking-second-part'>
                <h1>Hotel: {booking.nameOfHotel}</h1>
                <h1>Room: {booking.nameOfRoom}</h1>
                <h1>Total Price: ${booking.totalPrice}</h1>
                <h1>Date booked: {booking.createdAt.split("").slice(0, 10).join("")}</h1>
                <h1>Duration: {booking.dates[0]} - {booking.dates[booking.dates.length-1]}</h1>
                <p>Confirmation Number: {booking._id}</p>

                <button onClick={cancelReservation}
                className='cancel-reservation-button btn btn-danger btn-lg'>Cancel Reservation</button>

            </div>
        
        </div>
    )
}

export default SingleBooking;