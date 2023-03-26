import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';


function LogIn() {

    const [currentUserState, setCurrentUserState] = useState({
        username: "",
        password: ""
    });


    useEffect(() => {
        
    }, [])
    

    function logIn (e) {
        e.preventDefault();
        Axios.get(`http://localhost:8800/api/users/${currentUserState.username}/`)
            .then((response) => {
                if (response.data.password === currentUserState.password) {
                    alert("Success!");
                } else {
                    alert("Wrong password.")
                }
            })
    }

    function setUsername(e) {
        setCurrentUserState((prevState) => {
            return {...prevState, username: e.target.value}
        })
    }
    function setPassword(e) {
        setCurrentUserState((prevState) => {
            return {...prevState, password: e.target.value}
        })
    }

  return (
    <div className="App">
      <header className="App-header">

        <form onSubmit={logIn}>
            <input onChange={(e) => setUsername(e)} type='text' placeholder='username'></input>
            <input onChange={(e) => setPassword(e)} type='text' placeholder='password'></input>
            <button type='submit'>Log In</button>
        </form>

      </header>
    </div>
  );
}

export default LogIn;
