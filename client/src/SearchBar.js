import { useState } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function SearchBar (props) {

  const [dateRange, setDateRange] = useState([null, null]);

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

  function handleSetDateRange (value) {
    setDateRange([value[0], value[1]]);
  }

  return (
    <div className="search-bar-container">

        <div>
          <DateRangePicker clearIcon={null} format='MM/dd/y'className={'date-picker'} onChange={ (value) => {handleSetDateRange(value)} } value={dateRange} />
        </div>

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