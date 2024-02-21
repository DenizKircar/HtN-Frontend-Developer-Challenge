import { useState, useEffect } from 'react'
import { CustomView, browserName } from 'react-device-detect'
import bg from '../assets/htn-bg.png'
import '../css/header.css'

const Header = ({scrollTo}) => {
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 768px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    return (
        <header>
            <CustomView condition={browserName === "Safari" || browserName === 'Mobile Safari'}>
                <div className='safari-message'>You are currently using the browser: {browserName}. The login feature is not supported in your browser and therefore you will not be able to view the private events via loggin in. For the best user experience, use a browser other than {browserName}.</div>
            </CustomView>
            <img src={bg} alt="" />
            <div style={{fontSize: matches && '32px'}} className='schedule-line noselect' onClick={scrollTo}>See Schedule</div>
        </header>
    )
}


export default Header