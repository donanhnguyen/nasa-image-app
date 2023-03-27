import { useLocation } from "react-router-dom";

function Search () {

    const location = useLocation();


    return (
        <div className="App">
        <header className="App-header">
            <p>User: {location.state.currentUserState.username}</p>
            <h1>Search Hotels here</h1>
  
        </header>
      </div>
    )
}

export default Search;