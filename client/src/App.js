import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Search from './Search';
import Home from './Home';
import MyBookings from './MyBookings';
import HotelShowPage from './HotelShowPage';
import ConfirmBookingPage from './ConfirmBookingPage';
import { GlobalProvider } from './GlobalContext';
import { Link, BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
 

  return (
    <div className="App">

    <GlobalProvider>

      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route exact path='/' element={ <Home /> }></Route>
        <Route path='/login' element={ <LogIn /> }></Route>
        <Route path='/signup' element={ <SignUp /> }></Route>
        <Route path='/search' element={ <Search /> }></Route>
        <Route path='/myBookings' element={ <MyBookings /> }></Route>
        <Route path='/hotel/:hotelId' element={ <HotelShowPage />}></Route>
        <Route path='/ConfirmBookingPage' element={ <ConfirmBookingPage />}></Route>
      </Routes>
      </BrowserRouter>

    </GlobalProvider>
    </div>
  );
}

export default App;
