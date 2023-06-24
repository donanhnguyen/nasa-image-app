import {useContext} from 'react';
import './App.css';
import {Link} from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalContext from './GlobalContext';

function Nav () {

  const contextInfo = useContext(GlobalContext);
  const {currentUserState, setCurrentUserState} = contextInfo;
  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
      // set current user to null
      setCurrentUserState(null);
      // navigate back to home
      navigate('/login');

  }

  function displayLogInOrLogOutButton () {
    if (contextInfo.currentUserState) {
      return (
        <li>        
          <div className="modal-container">
          <input id="modal-toggle" type="checkbox"/>
          <button htmlfor='modal-toggle'>Log Out</button>
          <div className="modal-backdrop">
              <div className="modal-content">
              <label className="modal-close" htmlfor="modal-toggle">X</label>
              <h1>Are you sure you want to log out?</h1>
              <label onClick={logOut} className="modal-close button" htmlfor="modal-toggle">Yes</label>
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
  
  return (
    <div>
       
          <nav className='nav-bar'> 
          <img style={{width: '200px', heght: '100%', float: 'left'}} src="https://cdn.mos.cms.futurecdn.net/baYs9AuHxx9QXeYBiMvSLU-1200-80.jpg"></img>
          {/* <h1 className='galaxyStays'>
              Nasa Images
          </h1> */}
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
                
                {displayLogInOrLogOutButton()}
                
                {displaySignUpButtonOrNot()}    

            </ul>

        </nav>
    </div>


  );
}

export default Nav;
