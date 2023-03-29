import { useLocation, useNavigate, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';
import SearchBar from "./SearchBar";

function Search () {

    const location = useLocation();
    const navigate = useNavigate();
    const [allHotelsState, setAllHotelsState] = useState(null);

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
        if (allHotelsState) {
            var displayAllHotels = allHotelsState.map((hotel, index) => {
                return (
                    <div onClick={() => navigateToHotelShowPage(hotel)} 
                        className="single-hotel-displayed" 
                        key={hotel.name + index}>
                        <h1>{hotel.name}</h1>
                        <h1>Planet: {hotel.planet}</h1>
                        <img className="hotel-pic" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
                    </div>
                )
            })
            return displayAllHotels;
        }
    }

    return (
        <div className="App">
        <header className="App-header">


            {/* search bar here */}
            <SearchBar />
    
                    
      
        


            {/* display all hotels */}
            <div className="search-hotels-container">

                {displayAllHotels()}

            </div>


        </header>
      </div>
    )
}

export default Search;