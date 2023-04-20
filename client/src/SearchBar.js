import { useState, useContext, useEffect } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import GlobalContext from './GlobalContext';

function SearchBar (props) {

  const contextInfo = useContext(GlobalContext);
  const {dateRange, setDateRange, dateRangeArray, setDateRangeArray} = contextInfo;
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {allPlanets, 
    setSearchResultsReady,
    setIsLoading,
    chosenPlanetState,
    setChosenPlanetState,
    setSortFilterState
  } = props;

  function getDatesInRange (startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    for (let i in dates) {
      dates[i] = dates[i].toDateString();
    }
    return dates;
  }

  function applySearchFilters () {
    if (dateRange.some((date) => {
      return date === null;
    })) {
      setShowErrorModal(true);
    } else {


      setIsLoading(true);
      setSearchResultsReady(false);
      setTimeout(() => {
        setIsLoading(false);
        setSearchResultsReady(true);
      }, 1000)


    }
  }

  function setPlanetFilter (e) {
    setChosenPlanetState(e.target.value)
  }

  function setSortFilter (e) {
    setSortFilterState(e.target.value);
  }

  function handleSetDateRange (value) {
    setDateRange([value[0], value[1]]); 
    setDateRangeArray(getDatesInRange(value[0], value[1]));
  }

  return (
    <div className="search-bar-container">

        <div id="myModal" className={`modal ${showErrorModal ? "yes-modal" : "" }`}>
            <div className={`modal-content`}>
                <p style={{fontSize: '28px', color: 'red'}}>Date's can't be blank!</p>
                <button className="btn btn-danger btn-lg" style={{width: '40%', margin: 'auto'}} onClick={() => setShowErrorModal(false)}>Okay</button>
            </div>
        </div>

        <div>
          <DateRangePicker 
            clearIcon={null} 
            format='MM/dd/y'
            className={'date-picker'} 
            onChange={ (value) => {handleSetDateRange(value)} } 
            value={dateRange} 
            minDate={new Date()}
          />
        </div>

        <select id='planet' onChange={(e) => {setPlanetFilter(e)}} value={chosenPlanetState}>
          <option disabled selected value>Filter By Planet</option>
          <option>No Filter</option>
          {allPlanets.map((planet, i) => <option key={planet+i}value={planet}>{planet}</option>)}
        </select>

        <select id='sort-filter' onChange={(e) => {setSortFilter(e)}}>
          <option disabled selected value>Sort By:</option>
          <option>None</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        <button onClick={applySearchFilters}
          className='btn btn-primary'
          >Search
        </button>
    </div>

  );


}

export default SearchBar;