import { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider( {children} ) {

    const [currentUserState, setCurrentUserState] = useState(null);

    var renderURL = "https://nasa-image-app-backend.vercel.app";
    // if (process.env.NODE_ENV === "development") {
    //     renderURL = "http://localhost:8800"
    // } else if (process.env.NODE_ENV === 'production') {
    //     renderURL = "https://nasa-image-app-api.vercel.app"
    // };
    
    return (
        <GlobalContext.Provider value={ {
            currentUserState, 
            setCurrentUserState,
            renderURL,
        } }>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;