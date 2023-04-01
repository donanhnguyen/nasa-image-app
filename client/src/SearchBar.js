import { useState } from "react";
import DatePicker from 'react-datepicker';


function SearchBar (props) {

  const [startDate, setStartDate] = useState(new Date());
  const {allPlanets, 
    setSearchResultsReady,
    setIsLoading,
    chosenPlanetState,
    setChosenPlanetState
  } = props;

    

  function applySearchFilters () {
    setIsLoading(true);
    setSearchResultsReady(false);
    setTimeout(() => {
      setIsLoading(false);
      setSearchResultsReady(true);
    }, 1000)
  }

  function setPlanetFilter (e) {
    setChosenPlanetState(e.target.value)
  }

  return (
    <div className="search-bar-container">
        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}

        <label htmlFor='startDate'>Start Date</label>
        <input id='startDate' type='date'></input>
        <label htmlFor='endDate'>End Date</label>
        <input id='endDate' type='date'></input>

        <label htmlFor='planet'>Filter by Planet</label>
        <select id='planet' onChange={(e) => {setPlanetFilter(e)}}>
          <option disabled selected value>Planet</option>
          <option>None</option>
          {allPlanets.map((planet, i) => <option key={planet+i}value={planet}>{planet}</option>)}
        </select>

        <button onClick={applySearchFilters}
          className='btn btn-primary'
          >Search
        </button>
    </div>

  );


}

export default SearchBar;