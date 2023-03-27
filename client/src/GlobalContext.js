import { createContext, useState } from "react";

const GlobalContext = createContext();


export function GlobalProvider( {children} ) {

    const [currentUserState, setCurrentUserState] = useState(null);

    return (
        <GlobalContext.Provider value={ {currentUserState, setCurrentUserState} }>
            {children}
        </GlobalContext.Provider>
    )
}



export default GlobalContext;