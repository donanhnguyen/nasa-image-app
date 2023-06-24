import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import './LoginForm.css';
import './modal.css'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function LogIn () {

    const clientID = '972540435897-84bc3vsu79a0un7g9ug2h92atk49jir7.apps.googleusercontent.com'
    const clientSecret = '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'

    Axios.defaults.withCredentials = true;
    const contextInfo = useContext(GlobalContext);
    const {renderURL} = contextInfo;

    const navigate = useNavigate();

    const [errorsState, setErrorsState] = useState("");
    const [successfulLogIn, setSuccessfulLogIn] = useState(false);

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
        if (formState.username === "" || formState.password === "") {
            setErrorsState("Invalid Login")
        }
        Axios.post(`${renderURL}/api/users/logIn`, formState)
            .then((response) => {
                contextInfo.setCurrentUserState(response.data);
                setSuccessfulLogIn(true);
                setTimeout(() => {
                    navigate('/');  
                }, 1000)
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
        
        <div style={{width: '200px', margin: 'auto'}}>
            <GoogleOAuthProvider clientId={clientID}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        var decoded = jwt_decode(credentialResponse.credential);
                        contextInfo.setCurrentUserState({username: decoded.name});
                        navigate('/');
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;
            </GoogleOAuthProvider>
        </div>

      <header className="App-header">

      {/* modal */}
        <div id="myModal" className={`modal ${successfulLogIn ? "yes-modal" : "" }`}>
            <div className={`modal-content`}>
                <span className="close">&times;</span>
                <p>Success!</p>
            </div>
        </div>

        

        <div className="login-box">
        <h1 style={{color: 'red'}}>Please log in to see the pic of the day.</h1>
        <h2>Log In</h2>   
        {/* display error messages */}
        <div className='error-messages'>
            {errorsState}
        </div>
            <form onSubmit={logIn}>
                <div className="user-box">
                <input onChange={(e) => setUsername(e)} type="text" placeholder='username' required=""/>
                </div>
                <div className="user-box">
                <input onChange={(e) => setPassword(e)} type="password" placeholder='password' required=""/>
                </div>
                <button type='submit'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Log In
                </button>
            </form>
        </div>
            
      </header>
    </div>
  );
}

export default LogIn;
