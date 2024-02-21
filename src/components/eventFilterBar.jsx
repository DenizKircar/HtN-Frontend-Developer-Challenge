import '../css/topbar.css'

import { useContext, useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx'

import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { FilterContext } from '../filter/filter-context';

const EventFilterBar = ({}) => {
    const { dates, filters, selectedDate, selectedFilter, isInterested, handleSelectDate, handleSelectFilter, handleToggleIsInterested } = useContext(FilterContext);

    const [ dropDown, setDropdown ] = useState(false);

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 768px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    const filterClassName = `events-dropdown ${!dropDown && 'hidden'}`;
    return (
        <>
            <SearchBar />
            <ul className="event-filter-bar">
                <li className='event-filter-bar__button'>
                    <button style={{fontSize: matches && '14px', padding: matches && '4px'}} className={!selectedDate ? 'btn active' : "btn"} onClick={() => {handleSelectDate(null)}}>
                        See All
                    </button>
                </li>

                <ul className='dates'>
                    {dates.length > 0 && dates.map((date, index) => {
                        return (
                            <li key={index} className='event-filter-bar__button'>
                                <button style={{fontSize: matches && '14px', padding: matches && '4px'}} className={selectedDate === date ? 'btn active' : "btn"} onClick={() => {handleSelectDate(date)}}>
                                    {date}
                                </button>
                            </li>
                        )}
                    )}
                </ul>

                

                <li className='event-filter-bar__button filter-btn' >
                    <button style={{fontSize: matches && '14px', padding: matches && '4px'}} onClick={() => {setDropdown(prev => !prev)}} className='filter-button btn'>
                        Filter <i><FaFilter /></i>
                    </button>
                    
                    <ul className={filterClassName}>
                        {filters.length > 0 && filters.map((name, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => {handleSelectFilter(name)}}>{name.replace('_', ' ')}</button>
                                </li>
                            )
                        })}

                        <li className='divider'></li>
                        <li>
                            <button onClick={() => {handleToggleIsInterested()}}>
                                Interested
                            </button>
                        </li>
                    </ul>

                </li>

            </ul>

            <div className='flex-h'>
                {
                    selectedFilter &&
                    <button onClick={() => {handleSelectFilter(null)}} className='filter-remove'>
                        {selectedFilter.replace('_', ' ')}
                        <IoMdClose />
                    </button>
                }

                {
                    isInterested && 
                    <button onClick={() => {handleToggleIsInterested()}} className='filter-remove'>
                        Interested
                        <IoMdClose />
                    </button>
                }
            </div>
        </>
    )
}

export default EventFilterBar