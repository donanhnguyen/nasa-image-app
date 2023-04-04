import {useState, useEffect, useContext} from 'react';
import './App.css';
import Axios from 'axios';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import Modal from './Modal';

function Nav (props) {

  const contextInfo = useContext(GlobalContext);
  const {currentUserState, setCurrentUserState, setChosenPlanetState, setDateRange, setDateRangeArray} = contextInfo;
  const navigate = useNavigate();

  function logOut() {
      // set current user to null
      setCurrentUserState(null);
      // set the search filters back to null
      setChosenPlanetState(null);
      setDateRange([null, null]);
      setDateRangeArray(null);
      // navigate back to home
      navigate('/');
    // }
  }

  function displayLogInOrLogOutButton () {
    if (contextInfo.currentUserState) {
      return (
        // <li><button className='btn btn-danger' onClick={logOut}>Log Out</button></li>
        <li>        
          <div class="modal-container">
          <input id="modal-toggle" type="checkbox"/>
          <button for='modal-toggle'>Log Out</button>
          <div class="modal-backdrop">
              <div class="modal-content">
              <label class="modal-close" for="modal-toggle">X</label>
              <h1>Are you sure you want to log out?</h1>
              <label onClick={logOut}class="modal-close button" for="modal-toggle">Yes</label>
              </div>
          </div>
          </div>
        </li>
      )
    } else {
      return (
        <li><Link to='/login'>Log In</Link></li>
      )
    }
  }

  function displaySignUpButtonOrNot () {
    if (!contextInfo.currentUserState) {
      return (
        <li><Link to='/signup'>Sign Up</Link></li>
      )
    } 
  }

  function displayBookingsPageOrNot () {
    if (contextInfo.currentUserState) {
      return (
        <li><Link to='/myBookings'>My Bookings</Link></li>
      )
    } 
  }

  return (

        <nav className='nav-bar'>
            {
              currentUserState ?
              <p className='loggedin'>Welcome, {currentUserState.username}</p>
              :
              <p className='loggedin'>Not Logged In</p>
            }
            <ul>
 
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/search'>Search Hotels</Link>
                </li>

                {displayBookingsPageOrNot()}
                
                {displayLogInOrLogOutButton()}
                
                {displaySignUpButtonOrNot()}
            </ul>

        </nav>

  );
}

export default Nav;
