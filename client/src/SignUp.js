import {useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


function SignUp (props) {


    const contextInfo = useContext(GlobalContext);
    const {setCurrentUserState, currentUserState} = contextInfo;

    const location = useLocation();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });


    useEffect(() => {
        if (currentUserState) {
            navigate('/');
        }
    }, [])
    

    function logIn (e) {
        e.preventDefault();
        Axios.post(`http://localhost:8800/api/auth/register/`, formState)
            .then((response) => {
               setCurrentUserState(response.data);
               alert("Successful Register!");
               navigate('/');
            })
            .catch((error) => {
                alert("Invalid Register")
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
        <h1>sign up page</h1>
        <form onSubmit={logIn}>
            <input onChange={(e) => setUsername(e)} type='text' placeholder='username'></input>
            <input onChange={(e) => setPassword(e)} type='text' placeholder='password'></input>
            <button type='submit'>Register</button>
        </form>

      </header>
    </div>
  );
}

export default SignUp;
