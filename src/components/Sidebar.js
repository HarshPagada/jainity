import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faComment,faHeartCircleBolt, faIdCard, faSitemap, faUserPlus } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({sidebar, closesidebar}) => {
  return (
    <>
        <div className={sidebar?'sidebar sidebar--open':'sidebar'} onClick={closesidebar}>
        <li><Link to='/' className='text-decoration-none fw-semibold'><FontAwesomeIcon  className='mx-3' icon={faSitemap}/>Sangh</Link></li>
        <li><Link to='/laabh' className='text-decoration-none fw-semibold'><FontAwesomeIcon icon={faHeartCircleBolt} className='mx-3'/>Laabh</Link></li>
        <li><Link to='/About' className='text-decoration-none fw-semibold'><FontAwesomeIcon icon={faIdCard} className='mx-3'/>About</Link></li>
        <li><Link to='/Contact' className='text-decoration-none fw-semibold'><FontAwesomeIcon icon={faComment} className='mx-3'/>Contact</Link></li>
        <li><Link to='/Contact' className='text-decoration-none fw-semibold'><FontAwesomeIcon icon={faChalkboardUser} className='mx-3'/>Login</Link></li>
        <li><Link to='/Signin' className='text-decoration-none fw-semibold'><FontAwesomeIcon icon={faUserPlus} className='mx-3'/>Sign in</Link></li>
      </div>
    </>
  );
};

export default Sidebar;
