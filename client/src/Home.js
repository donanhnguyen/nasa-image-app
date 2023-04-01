import {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';


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
                <div key={planet}
                    className='single-planet-container'>
                    <p>{planet}</p>
                    <img className='single-planet-image'
                        src={require(`../pics/${planet.split(' ').join('')}.jpg`)}
                    >
                    </img>
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
            <div className='displayed-planets-container'>
                 {displayPlanets()}
            </div>
           

        </div>
    )
}

export default Home;