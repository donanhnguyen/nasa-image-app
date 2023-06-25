import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import './modal.css'

function SignUp () {


    const contextInfo = useContext(GlobalContext);
    const {setCurrentUserState, currentUserState, renderURL} = contextInfo;
    const [successfulResgister, setSuccessfulRegister] = useState(false);

    const navigate = useNavigate();

    const [errorsState, setErrorsState] = useState("");

    const [formState, setFormState] = useState({
        username: "",
        password: ""
    });


    useEffect(() => {
        if (currentUserState) {
            navigate('/');
        }
    }, [])
    

    function submitRegister (e) {
        e.preventDefault();
        if (formState.username === "" || formState.password === "") {
            setErrorsState("Fields can't be blank!");
        } else {
          Axios.post(`${renderURL}/api/users/register/`, formState)
            .then((response) => {
               setCurrentUserState(response.data);
               setSuccessfulRegister(true);
                setTimeout(() => {
                    navigate('/');  
                }, 1000)
            })
            .catch((error) => {
                setErrorsState("Username already taken.")
            })  
        }
         
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

        {/* modal */}
        <div id="myModal" className={`modal ${successfulResgister ? "yes-modal" : "" }`}>
            <div className={`modal-content`}>
                <span className="close">&times;</span>
                <p>Success!</p>
            </div>
        </div>

        <div className="login-box">
        <h2>Sign Up</h2>   
        {/* display error messages */}
        <div className='error-messages'>
            {errorsState}
        </div>
            <form onSubmit={submitRegister}>
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
                Register
                </button>
            </form>
        </div>

      </header>
    </div>
  );
}

export default SignUp;
