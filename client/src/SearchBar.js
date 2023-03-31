import { useState } from "react";
import DatePicker from 'react-datepicker';


function SearchBar (props) {

  const [startDate, setStartDate] = useState(new Date());
  const {allPlanets, 
    setSearchResultsReady,
    setIsLoading
  } = props;

    

  function applySearchFilters () {
    setIsLoading(true);
    setSearchResultsReady(false);
    setTimeout(() => {
      setIsLoading(false);
      setSearchResultsReady(true);
    }, 3000)
  }

  return (
    <div className="search-bar-container">
        {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}

        <label htmlFor='startDate'>Start Date</label>
        <input id='startDate' type='date'></input>
        <label htmlFor='endDate'>End Date</label>
        <input id='endDate' type='date'></input>

        <select>
          <option defaultValue="None">Planet</option>
          {allPlanets.map((planet, i) => <option key={planet+i}>{planet}</option>)}
        </select>

        <button onClick={applySearchFilters}
          className='btn btn-primary'
          >Search
        </button>
    </div>

  );


}

export default SearchBar;