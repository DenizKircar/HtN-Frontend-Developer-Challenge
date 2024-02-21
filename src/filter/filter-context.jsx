import { createContext, useContext, useEffect, useState } from "react";
import { convertDate } from "../components/EventDisplay";

export const FilterContext = createContext({
    events: [],
    setEvents: () => {},

    filteredEvents: [],
    setFilteredEvents: () => {},

    dates: [],
    handleSetDates: () => {},
    selectedDate: '',
    handleSelectDate: () => {},

    filters: [],
    handleSetFilters: () => {},
    selectedFilter: '',
    handleSelectFilter: () => {},

    interestList: [],
    handleSetInterest: () => {},
    isInterested: '',
    handleToggleIsInterested: () => {},

    searchValue: '',
    setSearchValue: () => {},

    handleSearch: () => {}
})



const FilterContextProvider = ({ children }) => {

    const getInitialInterestList = () => {
        const initialInterestList = localStorage.getItem('interestList');
        const updatedInterestList = initialInterestList ? JSON.parse(initialInterestList) : [];
        
        return updatedInterestList;
    }

    const [ storedInterestList, setStoredInterestList ] = useState(getInitialInterestList);

    const [ events, setEvents ] = useState([]);
    const [ filteredEvents, setFilteredEvents ] = useState([]);
    
    const [ filters, setFilters ] = useState({dates: [], filterOptions: [], interestList: storedInterestList});
    const [ selectedFilter, setSelectedFilter ] = useState({date: null, filterOption: null, isInterested: false});

    const [ searchValue, setSearchValue ] = useState('');
    

    const handleSetDates = (dates) => {
        setFilters(prev => {
            return {...prev, dates: dates}
        })
    }
    const handleSetFilters = (filterOptions) => {
        setFilters(prev => {
            return {...prev, filterOptions: filterOptions}
        })
    }
    const handleSetInterest = (id) => {
        setFilters(prev => {
            if(prev.interestList.includes(id)) {
                const newInterestList = [...prev.interestList].filter(e => e !== id);
                localStorage.setItem('interestList', JSON.stringify(newInterestList));

                return {...prev, interestList: newInterestList};
            } else {
                const newInterestList = [...prev.interestList, id];
                localStorage.setItem('interestList', JSON.stringify(newInterestList));

                return {...prev, interestList: newInterestList}
            }
        })
    }

    const handleSelectDate = (date) => {
        setSelectedFilter(prev => {
            return {...prev, date: date}
        })
        handleFilterEvents(date, selectedFilter.filterOption, selectedFilter.isInterested, searchValue);
    }
    const handleSelectFilter = (filter) => {
        setSelectedFilter(prev => {
            return {...prev, filterOption: filter}
        });
        handleFilterEvents(selectedFilter.date, filter, selectedFilter.isInterested, searchValue);
    }
    const handleToggleIsInterested = () => {
        handleFilterEvents(selectedFilter.date, selectedFilter.filterOption, !selectedFilter.isInterested, searchValue);
        setSelectedFilter(prev => {return {...prev, isInterested: !prev.isInterested}});
    }

    const handleSearch = (str) => {
        const string = str.toLowerCase()
        setSearchValue(str);
        handleFilterEvents(selectedFilter.date, selectedFilter.filterOption, selectedFilter.isInterested, string);
    }

    const handleFilterEvents = (date, filter, isInterested, str) => {
        var eventsIn = events;
        if(isInterested) {
            eventsIn = eventsIn.filter(e => {return filters.interestList.includes(e.id)});
        }

        if(str.length > 0) {
            eventsIn = eventsIn.filter(e => {return e.name.toLowerCase().match(str)})
        }

        setFilteredEvents(eventsIn.filter(e => {
            if(date !== null && filter !== null) {
                return (convertDate(e.start_time).date === date) && (e.event_type === filter);
            } else if(date !== null) {
                return convertDate(e.start_time).date === date;
            } else if(filter !== null) {
                return e.event_type === filter;
            } else {return true}
        }))
    }
    
    const ctxValue = {
        events: events,
        setEvents: setEvents,

        filteredEvents: filteredEvents,
        setFilteredEvents: setFilteredEvents,

        dates: filters.dates,
        handleSetDates: handleSetDates,
        selectedDate: selectedFilter.date,
        handleSelectDate: handleSelectDate,

        filters: filters.filterOptions,
        handleSetFilters: handleSetFilters,
        selectedFilter: selectedFilter.filterOption,
        handleSelectFilter: handleSelectFilter,

        interestList: filters.interestList,
        handleSetInterest: handleSetInterest,
        isInterested: selectedFilter.isInterested,
        handleToggleIsInterested: handleToggleIsInterested,

        searchValue: searchValue,
        setSearchValue: setSearchValue,

        handleSearch: handleSearch,
    };
    

    return (
        <FilterContext.Provider value={ctxValue}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContextProvider