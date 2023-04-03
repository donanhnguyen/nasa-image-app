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
            setChosenPlanetState
        } }>
            {children}
        </GlobalContext.Provider>
    )
}



export default GlobalContext;