import { useState, useEffect, useRef } from 'react';
import Event from './components/Event.jsx'
import Login from './components/Login.jsx';
import './css/App.css'
import './css/index.css'
import FilterContextProvider from './filter/filter-context.jsx';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';

import { browserName, CustomView } from 'react-device-detect';

function App() {
  const dialog = useRef();
  const eventRef = useRef();


  
  const executeScroll = () => eventRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  const navbar_elements = [{label: 'Schedule', onClick: () => {executeScroll()}}]; 



  const [ matches, setMatches ] = useState(window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
      window
      .matchMedia("(max-width: 768px)")
      .addEventListener('change', e => setMatches( e.matches ));
  }, []);



  const token = localStorage.getItem('token');
  const isLoggedIn = token === 'loggedin' ? true : false;

  const login_label = isLoggedIn ? 'Log Out' : 'Log In';
  const login = {label: login_label, onClick: () => {dialog.current.openSesame()}}
  


  const [ scrollPosn, setScrollPosn ] = useState(0);
  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    setScrollPosn(scrollPosition);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <>
      <FilterContextProvider>
        <CustomView condition={browserName !== "Safari" && browserName !== 'Mobile Safari'}>
          <Login ref={dialog} isLoggedIn={isLoggedIn}/>
        </CustomView>
        <Navbar
          scrollPosn={scrollPosn}
          elements={navbar_elements}
          login={login}
        />
        <div className='p-32' style={{padding: matches && '12px'}}>
          <Header scrollTo={executeScroll}/>
          <Event ref={eventRef}/>
        </div>
      </FilterContextProvider>
    </>
  )
}

export default App