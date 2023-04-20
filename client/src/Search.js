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
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [sortFilterState, setSortFilterState] = useState(null);
    const {chosenPlanetState, 
        setChosenPlanetState,
        dateRangeArray,
        dateRange,
        renderURL,
        hotelsState
    } = useContext(GlobalContext);

    const searchResultsContainerRef = useRef(null);

    var allPlanets = [];

    if (hotelsState) {
        for (let i in hotelsState) {
            if (!allPlanets.includes(hotelsState[i].planet)) {
                allPlanets.push(hotelsState[i].planet);
            }
        }
    } else {
        for (let i in allHotelsState) {
            if (!allPlanets.includes(allHotelsState[i].planet)) {
                allPlanets.push(allHotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        if (!hotelsState) {
            Axios.get(`${renderURL}/api/hotels/`)
                .then((response) => {
                    setAllHotelsState(response.data)
                })    
        } else {
            setAllHotelsState(hotelsState);
        }
        
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
            setShowErrorModal(true);
        }
    }

    function displayAllHotels () {
        var hotelsArrayBeforeFilters = [];
        // see if planet filter is chosen or not
        if (chosenPlanetState && chosenPlanetState !== "No Filter" && allHotelsState) {
            hotelsArrayBeforeFilters = allHotelsState.filter((hotel) => {
                return chosenPlanetState === hotel.planet;
            })
        } else {
            hotelsArrayBeforeFilters = allHotelsState;
        }
        // see if sort filter is selected or not

        var finalArray;

        if (sortFilterState === "Price: Low to High") {
            finalArray = hotelsArrayBeforeFilters.sort((hotelA, hotelB) => hotelA.lowestPrice - hotelB.lowestPrice)
        } else if (sortFilterState === "Price: High to Low") {
            finalArray = hotelsArrayBeforeFilters.sort((hotelA, hotelB) => hotelB.lowestPrice - hotelA.lowestPrice)
        } else {
            finalArray = hotelsArrayBeforeFilters;
        }
        
        // display the hotel listings after all filters;
        if (allHotelsState) {
            var displayAllHotels = finalArray.map((hotel, index) => {
                return (
                    <HotelListing
                        key={hotel.name + index}
                        hotel={hotel}
                        navigateToHotelShowPage={navigateToHotelShowPage}
                        sortFilterState={sortFilterState}
                    />
                )
            })  
            return displayAllHotels;  
        }

    }

    return (
        <div className="App">
       
       <div id="myModal" className={`modal ${showErrorModal ? "yes-modal" : "" }`}>
            <div className={`modal-content`}>
                <p style={{fontSize: '28px', color: 'red'}}>Please select your date range first</p>
                <button className="btn btn-danger btn-lg" style={{width: '35%', margin: 'auto'}} onClick={() => setShowErrorModal(false)}>Okay</button>
            </div>
        </div>

            {/* search bar here */}
            <SearchBar 
                allPlanets={allPlanets}
                setSearchResultsReady={setSearchResultsReady}
                searchResultsReady={searchResultsReady}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                chosenPlanetState={chosenPlanetState}
                setChosenPlanetState={setChosenPlanetState}
                setSortFilterState={setSortFilterState}
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