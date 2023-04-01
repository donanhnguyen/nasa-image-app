import {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import './cardflip.css';

function Home () {

    const {currentUserState, setCurrentUserState} = useContext(GlobalContext);
    const location = useLocation();
    const [hotelsState, setHotelsState] = useState();

    var allPlanets = [];
    if (hotelsState) {
        for (let i in hotelsState) {
            if (!allPlanets.includes(hotelsState[i].planet)) {
                allPlanets.push(hotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/`)
            .then((response) => {
                setHotelsState(response.data)
            })
    }, [])

    function displayPlanets () {
        const displayedPlanets = allPlanets.map((planet) => {
            return (
                <div class="flip-card single-planet-container">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                    <img src={require(`../pics/${planet.split(' ').join('')}.jpg`)} 
                        alt={planet} 
                        className="single-planet-image"
                    />
                    </div>
                    <div class="flip-card-back">
                        <h1>{planet}</h1>
                    </div>
                </div>
                </div>
            )
        })
        return displayedPlanets;
    }

    return (
        <div className="App-header">
            <h1>Welcome to GalaxyStays!</h1>
            {currentUserState ? 
                <h1>Logged in as {currentUserState.username}</h1> 
                : 
                <h1>You are not logged in.</h1>
            }

            {/* display all hotel planets here */}
            <h1>Browse by planets:</h1>
            <div className='displayed-planets-container'>
                
                 {displayPlanets()}
            </div>
           

        </div>
    )
}

export default Home;