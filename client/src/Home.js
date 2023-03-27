import {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


function Home () {

    const {currentUserState, setCurrentUserState} = useContext(GlobalContext);
    const location = useLocation();

    return (
        <div className="App-header">
            <h1>Welcome to GalaxyStays!</h1>
            {currentUserState ? 
                <h1>Logged in as {currentUserState.username}</h1> 
                : 
                <h1>You are not logged in.</h1>
            }
            <h1>this is home page</h1>
        </div>
    )
}

export default Home;