import EventDisplay from "./EventDisplay.jsx"
import { useContext, useState, useEffect } from "react";
import { FilterContext } from "../filter/filter-context.jsx";
import { convertDate } from "./EventDisplay.jsx";

import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'
import Fallback from "./Fallback.jsx";

//prints an array of related events from the related events array which has the id's of the said related events.
const printRel = (numArr, eArr) => {
    let relArr = [];
    for(let num of numArr) {
        const a = eArr.find(e => e.id === num)
        relArr = [...relArr, a]
    }

    return relArr.filter(e => e !== undefined);
}


const DisplayedEvents = ({ isLoading }) => {
    const { filteredEvents, selectedDate } = useContext(FilterContext);
    
    
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 768px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);
    

    return (
        <>
            {/* data loading */}
            {isLoading && <div className="loading-animation"><UseAnimations animation={loading2}/></div>}
            {/* no events fit the filters, display fallback */}
            {!isLoading && filteredEvents.length === 0 && <Fallback/>}
            {/* display events */}
            {!isLoading && filteredEvents.length > 0 && (
                <ul className="events-display-tab">
                    {filteredEvents.map(
                        (event, index) => {

                            const oldDate = index > 0 ? convertDate(filteredEvents[index - 1].start_time).date : convertDate(filteredEvents[index].start_time).date;
                            const newDate = convertDate(event.start_time).date;

                            return (
                                <>
                                    {/* if the date of the event is different than the previous one, display the date so that the user can differentiate tell apart the days of the events if the events are not filtered by date */}
                                    {
                                        (newDate !== oldDate || index === 0) && !selectedDate &&
                                        <li className="date-display">
                                            <h2>{newDate}</h2>
                                        </li>
                                    }
                                    {/* the event's display */}
                                    <li className="event-display" style={{paddingInline: matches && '18px'}} key={event.id}>
                                        <EventDisplay 
                                            event={event}
                                            rel_events={printRel(event.related_events, filteredEvents)}
                                        />
                                    </li>
                                </>
                            )
                        }
                    )}
                </ul>
            )}
        </>
    )
}

// can give random different color to events on different days

export default DisplayedEvents