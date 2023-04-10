import {useState, useEffect, useContext} from 'react';
import './App.css';
import Axios from 'axios';
import {Link} from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import Modal from './Modal';

function Nav (props) {

  const contextInfo = useContext(GlobalContext);
  const {currentUserState, setCurrentUserState, setChosenPlanetState, setDateRange, setDateRangeArray} = contextInfo;
  const navigate = useNavigate();
  const location = useLocation();

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
        <li><Link className={`${location.pathname === '/login' ? 'highlighted' : ""}`} to='/login'>Log In</Link></li>
      )
    }
  }

  function displaySignUpButtonOrNot () {
    if (!contextInfo.currentUserState) {
      return (
        <li><Link className={`${location.pathname === '/signup' ? 'highlighted' : ""}`} to='/signup'>Sign Up</Link></li>
      )
    } 
  }

  function displayBookingsPageOrNot () {
    if (contextInfo.currentUserState) {
      return (
        <li><Link className={`${location.pathname === '/myBookings' ? 'highlighted' : ""}`} to='/myBookings'>My Bookings</Link></li>
      )
    } 
  }
  
  return (
    <div>
       
          <nav className='nav-bar'>   
          <h1 className='galaxyStays'>
              GalaxyStays.com
          </h1>
            {
              currentUserState ?
              <p className='loggedin'>Welcome, {currentUserState.username}</p>
              :
              <p className='loggedin'>Not Logged In</p>
            }

            <ul>
 
                <li>
                  <Link className={`${location.pathname === '/' ? 'highlighted' : ""}`} to='/'>Home</Link>
                </li>
                <li>
                  <Link className={`${location.pathname === '/search' ? 'highlighted' : ""}`} to='/search'>Search Hotels</Link>
                </li>

                {displayBookingsPageOrNot()}
                
                {displayLogInOrLogOutButton()}
                
                {displaySignUpButtonOrNot()}    

            </ul>

        </nav>
    </div>


  );
}

export default Nav;
