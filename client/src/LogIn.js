import {useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


function LogIn(props) {


    const contextInfo = useContext(GlobalContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [errorsState, setErrorsState] = useState("");

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
                    setErrorsState("Wrong Password");
                }
            })
            .catch((error) => {
                setErrorsState(error.response.data)
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

        <h1>Log in page</h1>

        {/* display error messages */}
        <div className='error-messages'>
            {errorsState}
        </div>

        <form onSubmit={logIn}>
            <input onChange={(e) => setUsername(e)} type='text' placeholder='username'></input>
            <input onChange={(e) => setPassword(e)} type='text' placeholder='password'></input>
            <button className='btn btn-primary btn-lg' type='submit'>Log In</button>
        </form>

      </header>
    </div>
  );
}

export default LogIn;
