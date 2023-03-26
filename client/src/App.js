import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';


function App() {

  // useEffect(() => {
  //   Axios.get("http://localhost:8800/api/hotels/")
  //     .then(response => {
  //       console.log(response.data);
  //     })
  // }, [])

  return (
    <div className="App">

      <Nav/>

      <header className="App-header">
          <h1>Galaxy Stays</h1>


        <div>
          
        </div>

      </header>
    </div>
  );
}

export default App;
