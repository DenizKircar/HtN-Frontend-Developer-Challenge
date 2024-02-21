import '../css/navbar.css'
import { useRef, useState, useEffect } from 'react'
import { CustomView, browserName } from 'react-device-detect';

const Navbar = ({ elements, login, scrollPosn }) => {
    // the elements array is an array of objects in the form {label: '', onClick: () => {}}
    // login is an object of the same form, but goes to the right most of the navbar.

    const navbar = useRef();
    const [ navbarHeight, setNavbarHeight ] = useState();
    
    useEffect(() => {
        if (navbar.current) {
            setNavbarHeight(navbar.current.offsetHeight - 10);
        }
    }, []);

    const backgroundBeforeScroll = scrollPosn < 40 && 'none';

    return (
        <section className='navbar_container' style={{top: navbarHeight}}>
            <CustomView condition={browserName !== "Safari" && browserName !== 'Mobile Safari'}>
                <ul className="navbar" ref={navbar} style={{
                        background: backgroundBeforeScroll, 
                        border: backgroundBeforeScroll, 
                        backdropFilter: backgroundBeforeScroll, 
                    }}>
                    {elements.length > 0 && elements.map((e, index) => {
                        return <li key={index} className="navbar-item noselect" onClick={e.onClick}>{e.label}</li>
                    })}
                    <li className="navbar-item navbar-item__login noselect" onClick={login.onClick}>{login.label}</li>
                </ul>
            </CustomView>
        </section>
    )

}

export default Navbar