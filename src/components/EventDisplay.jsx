import { useState, useEffect, useContext, useRef } from 'react';
import '../css/event.css'

import { GoLinkExternal } from "react-icons/go";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import notfound from '../assets/notfound.jpeg';

import { FilterContext } from '../filter/filter-context';

export const convertDate = (unix) => {
    const date = new Date(unix);
    const fdate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
    
    var hour;
    var indicator;

    if(date.getHours() > 12) {
        hour = date.getHours() - 12;
        indicator = 'PM';
    } else {
        hour = date.getHours();
        indicator = 'AM';
    }

    const time = `${hour}:${date.getMinutes().toString().padStart(2, "0")} ${indicator}`;
    return {
        time: time,
        date: fdate
    }
}

const EventDisplay = ({ event, rel_events }) => {
    const { handleSelectFilter, handleSetInterest, interestList } = useContext(FilterContext);

    const [ matches, setMatches ] = useState(window.matchMedia("(max-width: 768px)").matches);

    const speakerRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    const [ expanded, setExpanded ] = useState(false);

    const id = event.id;
    const name = event.name;
    const start_time = convertDate(event.start_time).time;
    const end_time = convertDate(event.end_time).time;
    const event_type = event.event_type.replace('_', ' ');
    const description = event.description;
    const speakers = [...event.speakers];
    const link = event.public_url;
    const private_link = localStorage.getItem('token') === 'loggedin' ? event.private_url : null;

    const token = localStorage.getItem('token');
    const isLoggedIn = token === 'loggedin' ? true : false;
    
    let footer_class;
    if(expanded) {
        footer_class = 'event-card__footer active';
    } else {
        footer_class = 'event-card__footer';
    }
    
    return (
        <>
            <div className='flex-h-sp'>
                <div className='flex-h'>
                    
                    <button className='event_btn' onClick={() => {handleSetInterest(id);}}>
                        <i>{interestList.includes(id) ?  <IoIosCheckmarkCircle/> : <CiCirclePlus/>}</i>
                    </button>

                    <div className='event-display-header'>
                        {isLoggedIn ? <a href={private_link} target='_blank'><h2 style={{fontSize: matches && '18px'}}>{name}</h2></a> :
                        <h2 style={{fontSize: matches && '18px'}}>{name}</h2>}
                        <p style={{fontSize: matches && '14px'}}>
                            <CiClock2 /> {start_time} - {end_time}
                        </p>
                        <span onClick={() => {handleSelectFilter(event.event_type)}}>{event_type}</span>
                    </div>
                </div>
                <div className='link-container' style={{width: matches && 'max-content',  gap: matches && '8px'}}>
                    <a href={link} target='_blank'>
                        <button className='event_btn' style={{fontSize: matches && '186x'}}><GoLinkExternal /></button>
                    </a>
                    <button className={expanded ? 'deg0 event_btn' : 'deg180 event_btn'} onClick={() => {setExpanded(prev => !prev)}}>
                        <FaAngleDown />
                    </button>
                </div>
            </div>
            <div className={footer_class} style={{flexDirection: matches && 'column', height: matches && footer_class.includes('active') && 'max-content', gap: matches && '16px'}}>
                <div className='speaker-cards' ref={speakerRef}>
                        <h3 className='section-header'>Speakers: {matches && speakers.map((speaker, index) => {return <span style={{fontStyle: 'italic'}} key={index}>{speaker.name}{(index + 1) !== speakers.length && ','}</span>})}</h3>
                        {!matches && speakers.map((speaker, index) => {
                            if(speaker !== undefined) {
                                return (
                                    <div className='speaker-card' key={index}>
                                        <div className='speaker-pic' style={{backgroundImage: `url(${speaker.profile_pic || notfound})`}}></div>
                                        <h2>{speaker.name}</h2>
                                    </div>
                                )
                            }
                        })}
                </div>
                <div className='description' ref={descriptionRef} style={{gap: matches && '24px'}}>
                    <div className="event-description">
                        <h3 className='section-header'>Event Description</h3>
                        <p style={{maxHeight: matches && '100%'}}>{description}</p>
                    </div>
                    <div className='rel-events'>
                        {rel_events.length !== 0 && <h3 className='section-header'>Related Events</h3>}
                        <div className='rel-events_links' style={{maxHeight: matches && '100%'}}>
                        {rel_events.map((event, index) => {
                            if(event !== undefined) {
                                return <a href={event.public_url} target={event.public_url && '_blank'} className='rel-event__container noselect' key={index}>
                                    <h2>{event.name}</h2>
                                    <span>{event.event_type.replace('_', ' ')}</span>
                                </a>
                            }
                        })}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}


export default EventDisplay