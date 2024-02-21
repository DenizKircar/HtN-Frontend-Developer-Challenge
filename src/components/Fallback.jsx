import { useContext } from "react"
import '../css/fallback.css'

import { FilterContext } from "../filter/filter-context"
import { MdCalendarToday } from "react-icons/md";


const Fallback = ({ }) => {

    const { handleSelectFilter, handleSelectDate, handleToggleIsInterested, isInterested, events, setFilteredEvents, setSearchValue } = useContext(FilterContext);

    const removeAllFilters = () => {
        handleSelectDate(null);
        handleSelectFilter(null);
        setSearchValue('');
        if(isInterested) {
            handleToggleIsInterested();
        }
        setFilteredEvents(events);
    }

    return (
        <div className="fallback">
            <i><MdCalendarToday/></i>
            <h2>No scheduled segments found.</h2>
            <h3>Unable to find any scheduled segments given your selected tags and search.</h3>
            <button onClick={removeAllFilters}>Clear Tags and Search</button>
        </div>
    )
}

export default Fallback