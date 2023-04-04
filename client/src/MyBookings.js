import {useEffect, useContext, useReducer} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


const initialState = null;

function myBookingsReducer(state, action) {
  switch (action.type) {
    case 'getAllBookings':
      return action.payload;
    case 'deleteBooking':
      
    default:
      throw new Error();
  }
}

function MyBookings () {

  const [myBookingsState, myBookingsDispatch] = useReducer(myBookingsReducer, initialState);

  const {currentUserState} = useContext(GlobalContext);

  useEffect(() => {
    Axios.get(`http://localhost:8800/api/users/${currentUserState._id}/bookings/`)
        .then((response) => {
            myBookingsDispatch({type: 'getAllBookings', payload: response.data});
        })
  }, [])


  function displayAllBookings () {
    if (myBookingsState) {
      const displayed = myBookingsState.map((booking) => {
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

            <button className='cancel-reservation-button btn btn-danger btn-lg'>Cancel Reservation</button>

          </div>
          
        </div>
      )
    })
    return displayed.reverse();
    }

  }

  return (
    <div className="App">

       <div class='myBookings-container'>
          {displayAllBookings()}
       </div>

    </div>
  );
}

export default MyBookings;
