import { createContext, useState } from "react";

const GlobalContext = createContext();


export function GlobalProvider( {children} ) {

    function isRoomAvailableOrNot (desiredDates, unavailableDates) {
        for (let i in desiredDates) {
            let currentDate =  desiredDates[i];
            if (unavailableDates.includes(currentDate)) {
                return false;
            }
        }
        return true;
    }

    const [currentUserState, setCurrentUserState] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [dateRangeArray, setDateRangeArray] = useState();
    const [chosenPlanetState, setChosenPlanetState] = useState(null);
    const [hotelsState, setHotelsState] = useState();

    // const localHost = "http://localhost:8800";
    var renderURL = "";
    if (process.env.NODE_ENV === "development") {
        renderURL = "http://localhost:8800";
    } else if (process.env.NODE_ENV === 'production') {
        renderURL = "https://galaxystays-backend.onrender.com";
    };
    
    return (
        <GlobalContext.Provider value={ {
            currentUserState, 
            setCurrentUserState,
            dateRange,
            setDateRange,
            dateRangeArray,
            setDateRangeArray,
            isRoomAvailableOrNot,
            chosenPlanetState, 
            setChosenPlanetState,
            hotelsState,
            setHotelsState,
            renderURL
        } }>
            {children}
        </GlobalContext.Provider>
    )
}



export default GlobalContext;