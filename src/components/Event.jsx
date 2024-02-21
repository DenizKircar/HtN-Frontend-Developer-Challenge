import { useEffect, useState, useContext, forwardRef } from "react";
import DisplayedEvents from './DisplayedEvents.jsx';
import EventFilterBar from "./eventFilterBar.jsx";
import { convertDate } from "./EventDisplay.jsx";
import Error from "./Error.jsx";

import { FilterContext } from "../filter/filter-context.jsx";

const dateListMaker = (events) => {
    var dateArray = [];

    for(const event of events) {
        const eventDate = convertDate(event.start_time).date;
        if(dateArray.includes(eventDate) !== true) {
            dateArray = [...dateArray, eventDate];
        }
    }
    return dateArray;
}
const filterListMaker = (events) => {
    var filterArray = [];

    for (const event of events) {
        const eventType = event.event_type;
        if(filterArray.includes(eventType) !== true) {
            filterArray = [...filterArray, eventType]
        }
    }
    
    return filterArray;
}

const Event = forwardRef(
    ({}, ref) => {

        const { setEvents, setFilteredEvents, handleSetDates, handleSetFilters } = useContext(FilterContext);
        const token = localStorage.getItem('token');
        const [ isFetching, setIsFetching ] = useState(false);
        const [ error, setError ] = useState();

        useEffect(() => {
            setIsFetching(true);

            const fetchEvents = async () => {
                try {
                    const response = await fetch('https://api.hackthenorth.com/v3/events');
                    const resData = await response.json();
                    const sortedData = [...resData].sort((a, b) => {return a.start_time-b.start_time})
                    const publicData = token === 'loggedin' ? sortedData : sortedData.filter(e => e.permission === 'public');
                    
                    setEvents(publicData);
                    setFilteredEvents(publicData);

                    const dateArray = dateListMaker(publicData);
                    handleSetDates(dateArray);
                    
                    const filterArray = filterListMaker(publicData);
                    handleSetFilters(filterArray);
                    
                    setIsFetching(false);
                } catch(error) {
                    setError({message: error.message || 'error fetching events'})
                    setIsFetching(false);
                }
            }
            fetchEvents();
        }, []);

        if (error) {
            return <Error title='An error has occurred' message={error.message}/>
        }

        return (
            <section className="event" ref={ref}>
                <EventFilterBar />
                <DisplayedEvents
                    isLoading={isFetching}
                />
        </section>
        )
    }
)



export default Event