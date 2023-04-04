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
            console.log(response.data);
        })
  }, [])

  return (
    <div className="App">
      <header className="App-header">

        my bookings

            

      </header>
    </div>
  );
}

export default MyBookings;
