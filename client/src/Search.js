import { useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import Axios from 'axios';
import SearchBar from "./SearchBar";
import Loader from './Loader';
import HotelListing from "./HotelListing";
import GlobalContext from './GlobalContext';


function Search () {

    const location = useLocation();
    const navigate = useNavigate();
    const [allHotelsState, setAllHotelsState] = useState(null);
    const [searchResultsReady, setSearchResultsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {chosenPlanetState, 
        setChosenPlanetState,
        hotelsInfoObject,
        dateRangeArray,
    } = useContext(GlobalContext);

    const searchResultsContainerRef = useRef(null);
    const resultsCountRef = useRef();

    var allPlanets = [];
    if (allHotelsState) {
        for (let i in allHotelsState) {
            if (!allPlanets.includes(allHotelsState[i].planet)) {
                allPlanets.push(allHotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/`)
            .then((response) => {
                setAllHotelsState(response.data)
            })
    }, [])

    function navigateToHotelShowPage (hotel) {
        navigate(`/hotel/${hotel._id}`, {state: {hotel: hotel} } );
    }

    function displayAllHotels () {
        var hotelsArrayBeforeFilters = [];
        
        if (chosenPlanetState && chosenPlanetState !== "None") {
            hotelsArrayBeforeFilters = allHotelsState.filter((hotel) => {
                return chosenPlanetState === hotel.planet;
            })
        } else {
            hotelsArrayBeforeFilters = allHotelsState;
        }

        var displayAllHotels = hotelsArrayBeforeFilters.map((hotel, index) => {
            return (
                <HotelListing
                    key={hotel.name + index}
                    hotel={hotel}
                    navigateToHotelShowPage={navigateToHotelShowPage}
                />
            )
        })  
        return displayAllHotels; 
    }

    return (
        <div className="App">
       

            {/* search bar here */}
            <SearchBar 
                allPlanets={allPlanets}
                setSearchResultsReady={setSearchResultsReady}
                searchResultsReady={searchResultsReady}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                chosenPlanetState={chosenPlanetState}
                setChosenPlanetState={setChosenPlanetState}
            />
    

            {/* display all hotels */}
            <div  className="search-hotels-container">

                {isLoading ?
                    <Loader/> 
                    :
                    <div></div>
                }

                {/* { searchResultsReady ?
                    <h1 style={{color: 'white'}}>{resultsCountRef.current} results:</h1>
                    :
                    <div></div>
                } */}

                <div ref={searchResultsContainerRef} className="results-container">
                    { searchResultsReady ?
                        displayAllHotels()
                        :
                        <div></div>
                    }
                    
                </div>

            </div>


      </div>
    )
}

export default Search;