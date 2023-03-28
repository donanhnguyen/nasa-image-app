import { useState } from "react";
import DatePicker from 'react-datepicker';


function SearchBar () {

    const [startDate, setStartDate] = useState(new Date());

        
  return (
    <div className="search-bar-container">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


        <select>
            <option>Tatooine</option>
            <option>Hoth</option>
            <option>Nar Shaddaa</option>

        </select>

    </div>

  );


}

export default SearchBar;