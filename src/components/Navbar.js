import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import image from '../logo_n.png'

const Navbar = ({ opensidebar}) => {
  return (
<>
    <div className='tool-bar position-sticky top-0'>
      <div className='burger' onClick={opensidebar} >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Link to='/Sangh' className="text-decoration-none d-flex ">
        <img style={{'height':"50px"}} src={image}/>
        <div className='title text-danger'>JAINITY</div>
      </Link>
    </div >


    </>
  )
}

export default Navbar

