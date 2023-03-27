import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import LogIn from './LogIn';
import { Link } from 'react-router-dom';

function App() {

  const [currentUserState, setCurrentUserState] = useState(null);

  function displayLogInFormOrNot () {
    if (!currentUserState) {
      return <LogIn 
                setCurrentUserState={setCurrentUserState}
                currentUserState={currentUserState}
              />
    } else {
      return (
        <div>
          <h1>you are logged in as {currentUserState.username}</h1>
          <Link to='/search' state={{currentUserState: currentUserState}}>go to search page</Link>
        </div>
      )
    }
  }


  return (
    <div className="App">

      <Nav 
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
       />

      <header className="App-header">
          <h1>Galaxy Stays</h1>

          <div>
            {displayLogInFormOrNot()}
            <button onClick={() => setCurrentUserState(null)}>Log Out</button>
            
          </div>



        <div>
          
        </div>

      </header>
    </div>
  );
}

export default App;
