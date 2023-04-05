import {useEffect, useContext, useReducer, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import GlobalContext from './GlobalContext';

function SingleBooking (props) {

    const {currentUserState} = useContext(GlobalContext);
    const {booking, myBookingsDispatch} = props;
    const [singleRoomState, setSingleRoomState] = useState();

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/rooms/${booking.roomId}`)
            .then((response) => {
                setSingleRoomState(response.data)
            })
    }, [])

    function cancelReservation () {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            // dispatch to reducer to update UI so that the deleted booking no longer shows
            myBookingsDispatch({type: 'deleteBooking', payload: booking});
            // push the room unavailableDates into new array, minus the booking.dates
            var newUnavailableDatesArray = [];
            for (let i in singleRoomState.unavailableDates) {
                let currentDate = singleRoomState.unavailableDates[i];
                if (!booking.dates.includes(currentDate)) {
                    newUnavailableDatesArray.push(currentDate);
                }
            }
            // api call to remove from /bookings
            Axios.delete(`http://localhost:8800/api/users/${currentUserState._id}/bookings/${booking._id}`)
                .then((response) => console.log(response))
                .catch((err) => console.log(err))
            // api call to update the room's unavailable dates
            Axios.put(`http://localhost:8800/api/hotels/rooms/${singleRoomState._id}`, 
                {unavailableDates: newUnavailableDatesArray});
        }       
    }

    return (
        <div className='single-booking-container'>

            <div className='booking-first-part'>
                <img className="hotel-pic-my-bookings-page" src={require(`../pics/${booking.nameOfHotel.split(' ').join('')}.jpg`)}></img>
            </div>

            <div className='booking-second-part'>
                <h1 style={{color: 'yellow'}}>Hotel: {booking.nameOfHotel}</h1>
                <h1>Room: {booking.nameOfRoom}</h1>
                
                <h1>Date booked: {booking.createdAt.split("").slice(0, 10).join("")}</h1>
                <h1>Duration: {booking.dates[0]} - {booking.dates[booking.dates.length-1]}</h1>
                <p>Confirmation Number: {booking._id}</p>

                <h1 style={{float: 'left'}}>Total Price: <h1 style={{color: 'green'}}>${booking.totalPrice}</h1></h1>
                <button onClick={cancelReservation}
                className='cancel-reservation-button btn btn-danger btn-lg'>Cancel Reservation</button>

            </div>
        
        </div>
    )
}

export default SingleBooking;