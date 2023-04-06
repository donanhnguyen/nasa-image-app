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
        dateRangeArray,
        dateRange,
        localHost,
        renderURL
    } = useContext(GlobalContext);

    const searchResultsContainerRef = useRef(null);

    var allPlanets = [];
    if (allHotelsState) {
        for (let i in allHotelsState) {
            if (!allPlanets.includes(allHotelsState[i].planet)) {
                allPlanets.push(allHotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        Axios.get(`${renderURL}/api/hotels/`)
            .then((response) => {
                setAllHotelsState(response.data)
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        setSearchResultsReady(false);
        setTimeout(() => {
          setIsLoading(false);
          setSearchResultsReady(true);
        }, 1000)
    }, [chosenPlanetState, dateRange])

    function navigateToHotelShowPage (hotel) {
        if (dateRangeArray) {
            navigate(`/hotel/${hotel._id}`, {state: {hotel: hotel} } );  
        } else {
            alert("Please select your date range first.");
        }
    }

    function displayAllHotels () {
        var hotelsArrayBeforeFilters = [];
        
        if (chosenPlanetState && chosenPlanetState !== "No Filter" && allHotelsState) {
            hotelsArrayBeforeFilters = allHotelsState.filter((hotel) => {
                return chosenPlanetState === hotel.planet;
            })
        } else {
            hotelsArrayBeforeFilters = allHotelsState;
        }
        if (allHotelsState) {
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

                { searchResultsReady ?
                    <h1 style={{color: 'white'}}>{searchResultsContainerRef.current.children.length} results:</h1>
                    :
                    <div></div>
                }

                <div ref={searchResultsContainerRef} 
                    className={`results-container`}
                >
                    {displayAllHotels()}
                </div>

            </div>


      </div>
    )
}

export default Search;