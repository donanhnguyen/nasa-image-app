import {useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


function LogIn(props) {


    const contextInfo = useContext(GlobalContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });


    useEffect(() => {
        if (contextInfo.currentUserState) {
            navigate('/');
        }
    }, [])
    

    function logIn (e) {
        e.preventDefault();
        Axios.get(`http://localhost:8800/api/users/${formState.username}/`)
            .then((response) => {
                if (response.data.password === formState.password) {
                    contextInfo.setCurrentUserState(response.data);
                    alert("Success!");
                    navigate('/');
                } else {
                    alert("Wrong password.")
                }
            })
            .catch((error) => {
                alert("Invalid Login")
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
