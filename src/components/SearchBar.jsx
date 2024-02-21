import { useState, useContext } from "react"
import { FilterContext } from "../filter/filter-context";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ }) => {
    
    const { handleSearch, searchValue } = useContext(FilterContext);
    
    const handleChange = (e) => {
        e.preventDefault();
        handleSearch(e.target.value);
    }

    return (
        <div className="search-bar">
            <label htmlFor="searchBar"><FaSearch /></label>
            <input
                id="searchBar"
                type="text"
                placeholder="Search for events..."
                onChange={handleChange}
                value={searchValue}
            />
        </div>
    )
}


export default SearchBar
