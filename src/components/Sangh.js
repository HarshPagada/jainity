import { faAngleDown, faDharmachakra, faPercentage, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Operationdesign from './Operationdesign'
import image from '../8445619_up_arrow_angel_in_square_icon.png'

function Sangh(props) {

  const [operationalData, setOperationalData] = useState(null);
  // console.log(...operationalData)
  const [sum, setSum] = useState(0);
  const [showTable, setshowTable] = useState({});
  const [textdirection, setTextdirection] = useState(0);
  const [sorting, setSorting] = useState('recent');
  const [showAllTables, setShowAllTables] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [selectedLaabhCount, setselectedLaabhCount] = useState(0);
  const [selectedSanghCount, setselectedSanghCount] = useState(0);
  // const [alldonate, setallDonate] = useState({});

  const TextDeductible = () => {
    setTextdirection(textdirection === 1 ? 0 : 1)
    props.setLoading(true)
  }

  const sortView = (selectedOption) => {
    setSorting(selectedOption);
    props.setLoading(true);
  };

  const toggleTable = (SanghID) => {
    setshowTable((prevVisibility) => {
      // const newVisibility = !prevVisibility[SanghID];
      localStorage.setItem('id', JSON.stringify(SanghID));
      return {
        ...prevVisibility,
        [SanghID]: !prevVisibility[SanghID],
      };
    });
  };

  const toggleAllTables = () => {
    setShowAllTables((prevShowAllTables) => !prevShowAllTables);
  };

  const receiveOperationalData = (data) => {
    setOperationalData(data);
  };

  const pullData = (tempArray) => {
    let se = tempArray.map((a) => a.LaabhJson.filter((k) => k.amount)).flat().length
    setselectedLaabhCount(se)
    // console.log(tempArray.map((a) => a.LaabhJson.filter((k) => k.amount)))
    // console.log(tempArray.map((a) => a.LaabhJson.filter((k) => k.amount)).flat())

    let str = tempArray.filter((e) => e.LaabhJson.find((i) => i.amount)).length
    setselectedSanghCount(str)
  }

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    setScrollDirection(currentScrollPosition > scrollPosition ? 'down' : 'up');
    setScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const allDelete = ()=>{
   localStorage.removeItem('donateSangh')
    
  }

  return (
    <div>
      <h4 className='text-danger text-center my-4'>Online Charity towards Jain Organisations in India</h4>
      <h2 className='text-danger text-center my-4'>Sangh View</h2>
      <div className='container-fluid'>
        <button type='button' className='mx-3 btn btn-outline-primary text-center btn-sm' onClick={props.opensidebar.toggleSangh}>Sangh {props.totalsangh ? `(${props.totalsangh})` : ""} <FontAwesomeIcon icon={faAngleDown} /></button>
        <button type='button' className='mx-1 btn btn-outline-primary rounded btn-sm' onClick={props.opensidebar.toggleLaabh}>Laabh {props.totallaabh ? `(${props.totallaabh})` : ""} <FontAwesomeIcon icon={faAngleDown} /></button>
        <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" />
        <label className="btn btn-outline-primary mx-2 btn-sm" htmlFor="btncheck3" onClick={TextDeductible}> <FontAwesomeIcon icon={faPercentage} /> Tax Deductible</label>
      </div>

      <div className='container-fluid d-flex justify-content-between my-3 flex-sm-direction-column'>
        <Link className='mx-3 align-items-center' to="" onClick={toggleAllTables}>{showAllTables ? 'Hide All' : 'Show All'}</Link>
        <div className='text-end'>
          Selected {selectedLaabhCount} Laabh at {selectedSanghCount} Sangh
          <Link type='button' to={sum !== 0 ? { pathname: '/Donate'} : '#'} className={`mx-1 rounded btn btn-primary btn-sm `}><FontAwesomeIcon icon={faDharmachakra} /> ₹ Donate {sum}</Link>
          {sum>0 ? <FontAwesomeIcon className='mx-3' icon={faTrash} onClick={allDelete}/> : null}
                                
        </div>
      </div>

      <div className='d-flex align-items-center justify-content-between mx-2'>
        <p className='mx-3'>Donate towards any of the {operationalData ? `${operationalData.totalLaabhData} Laabh Options at ${operationalData.totalData} Sangh` : 'loading...'}</p>
        <div className="btn-group mx-2">
          <button type="button" className="btn btn-light dropdown-toggle  btn-outline-primary rounded" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {sorting}
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={() => sortView('recent')}>Recent</a>
            <a className="dropdown-item" onClick={() => sortView('a_z')}>A-Z</a>
            <a className="dropdown-item" onClick={() => sortView('z_a')}>Z-A</a>
          </div>
        </div>

      </div>
      <Link to=''><img src={image} className={`image ${scrollPosition > 100 ? 'scrolled' : ''} ${scrollDirection === 'up' ? 'hidden' : ''}`} onClick={scrollToTop} /></Link>

      <Operationdesign setLoading={props.setLoading} loading={props.loading} onOperationalData={receiveOperationalData}
        sum={sum} setSum={setSum} setSanghData={props.setSanghData} textdirection={textdirection} sorting={sorting}
         toggleTable={toggleTable} showTable={showTable} showAllTables={showAllTables} 
         selectedLaabh={props.selectedLaabh} selectedsangh={props.selectedsangh} pullData={pullData} />
    </div>
  )
}

export default Sangh
