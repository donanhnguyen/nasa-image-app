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
          <SingleBooking
            key={booking._id} 
            booking={booking}
            myBookingsDispatch={myBookingsDispatch}
          />
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
