import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Axios from 'axios';


function LogIn(props) {

    const location = useLocation();
    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });

    const {currentUserState, setCurrentUserState} = props;

    useEffect(() => {
        
    }, [])
    

    function logIn (e) {
        e.preventDefault();
        Axios.get(`http://localhost:8800/api/users/${formState.username}/`)
            .then((response) => {
                if (response.data.password === formState.password) {
                    setCurrentUserState(response.data);
                    alert("Success!");
                } else {
                    alert("Wrong password.")
                }
            })
    }

    function setUsername(e) {
        setFormState((prevState) => {
            return {...prevState, username: e.target.value}
        })
    }
    function setPassword(e) {
        setFormState((prevState) => {
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
