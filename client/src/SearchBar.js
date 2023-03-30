import { useState } from "react";
import DatePicker from 'react-datepicker';


function SearchBar (props) {

    const [startDate, setStartDate] = useState(new Date());
    const {allPlanets} = props;

    
  return (
    <div className="search-bar-container">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


        <select>
          {allPlanets.map((planet, i) => <option key={planet+i}>{planet}</option>)}
        </select>

    </div>

  );


}

export default SearchBar;