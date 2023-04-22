import {useEffect, useContext, useReducer} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import SingleBooking from './SingleBooking';

const initialState = null;

function myBookingsReducer(state, action) {
  switch (action.type) {
    case 'getAllBookings':
      return action.payload;
    case 'deleteBooking':
      const newState = state.filter((booking) => {
        return booking._id !== action.payload._id;
      })
      return newState;
    default:
      throw new Error();
  }
}

function MyBookings () {

  const [myBookingsState, myBookingsDispatch] = useReducer(myBookingsReducer, initialState);

  const {currentUserState, renderURL} = useContext(GlobalContext);

  useEffect(() => {
    Axios.get(`${renderURL}/api/users/${currentUserState._id}/bookings/`)
        .then((response) => {
            myBookingsDispatch({type: 'getAllBookings', payload: response.data});
        })
  }, [])

  function displayUpcomingBookings () {
    // filter out which ones are upcoming or not
    var upcomingBookings = [];
    for (let i in myBookingsState) {
      let currentBooking = myBookingsState[i];
      let currentDate = new Date().toDateString();
      if ( currentDate <= currentBooking.dates[currentBooking.dates.length-1] ) {
        upcomingBookings.push(currentBooking);
      }
    }
    // sort by upcoming date
    var upcomingBookingsSorted = upcomingBookings.sort((bookingA, bookingB) => {return bookingA.dates[0] - bookingB.dates[0]});
    // display them
    const displayed = upcomingBookingsSorted.map((booking) => {
      return (
        <SingleBooking
          key={booking._id} 
          booking={booking}
          myBookingsDispatch={myBookingsDispatch}
          inThePast={false}
        />
      )
    })
    return displayed;
  }

  function displayPastBookings () {
    // filter out bookings that have already happened
    var pastBookings = [];
    for (let i in myBookingsState) {
      let currentBooking = myBookingsState[i];
      let currentDate = new Date().toDateString();
      if ( currentDate > currentBooking.dates[currentBooking.dates.length-1] ) {
        pastBookings.push(currentBooking);
      }
    }
    // sort them by date
    var pastBookingsSorted = pastBookings.sort((bookingA, bookingB) => {return bookingB.dates[0] - bookingA.dates[0]});

    // display them
    const displayed = pastBookingsSorted.map((booking) => {
      return (
        <SingleBooking
          key={booking._id} 
          booking={booking}
          myBookingsDispatch={myBookingsDispatch}
          inThePast={true}
        />
      )
    })
    return displayed;
  }

  if (myBookingsState && myBookingsState.length === 0) {
     return (
        <div className="App">
            <h1 style={{color: 'white'}}>You have no upcoming bookings. Book now!</h1>
        </div>
      ); 
  } else {
      return (
        <div className="App">

          <div class='myBookings-container'>
              <h1 style={{color: 'white', marginBottom: '30px'}}>Upcoming Bookings:</h1>
              {displayUpcomingBookings()}
          </div>

          <div class='myBookings-container'>
              <h1 style={{color: 'white', marginBottom: '30px', marginTop: '30px'}}>Past Bookings:</h1>
              {displayPastBookings()}
          </div>

        </div>
      ); 
  }

}

export default MyBookings;
