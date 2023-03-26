import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {Link} from "react-router-dom"


function Nav() {



  return (


        <nav>
            <ul>
                <li><Link to='/login'>Log In</Link></li>
            </ul>


        </nav>



  );
}

export default Nav;
