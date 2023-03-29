import {useState, useEffect, useContext} from 'react';
import './App.css';
import Axios from 'axios';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import GlobalContext from './GlobalContext';

function Nav (props) {

  const contextInfo = useContext(GlobalContext);
  const navigate = useNavigate();

  function logOut() {
    // confirm thru message
    if (window.confirm("Do you really want to Log Out?")) {
       // set user state to null
      contextInfo.setCurrentUserState(null);
      // navigate back to home
      navigate('/');
    }
  }

  function displayLogInOrLogOutButton () {
    if (contextInfo.currentUserState) {
      return (
        <button onClick={logOut}>Log Out</button>
      )
    } else {
      return (
        <Link to='/login'>Log In</Link>
      )
    }
  }

  function displaySignUpButtonOrNot () {
    if (!contextInfo.currentUserState) {
      return (
        <Link to='/signup'>Sign Up</Link>
      )
    } 
  }

  return (

        <nav className='nav-bar'>

            <ul>
                <li>
                  {displayLogInOrLogOutButton()}
                </li>
                <li>
                  {displaySignUpButtonOrNot()}
                </li>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/search'>Search</Link>
                </li>
            </ul>

        </nav>

  );
}

export default Nav;
