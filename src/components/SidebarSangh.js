import React, { useState, useEffect } from 'react'
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function SidebarSangh({ sanghbar, sanghData, closesidebar, setselectedSangh, settotalSangh, selectedsangh, setLoading }) {

  const [clear, setClear] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (sanghId) => {

    setClear((prevClear) => {
      if (prevClear.includes(sanghId)) {
        return prevClear.filter((key) => key !== sanghId);
      } else {
        return [...prevClear, sanghId];
      }
    });
  };

  const handleClearButtonClick = () => {
    setClear([]);
    setselectedSangh([])
    setLoading(true)
  };

  const filteredArray = sanghData.filter((data) => {
    const searchString = `${data.ReceiptName} ${data.RegisteredAddress}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // console.log('filter', filteredArray)
  // console.log(sanghData)

  useEffect(() => {
    settotalSangh(selectedsangh.length)
  }, [selectedsangh.length]);

  return (
    <>
      <div className={`sidebar ${sanghbar ? 'sidebar--open' : ''} overflow-auto`}>

        <div className='position-sticky top-0 bg-light'>
          <div className='container-fluied d-flex justify-content-between align-items-center shadow-sm p-1 bg-body rounded'>
            <div className='d-flex justify-content-between align-items-center mx-1'>
              <FontAwesomeIcon icon={faCircleXmark} className='mx-1' onClick={closesidebar} />
              <h5 className='mx-1'>Sangh({clear.length}/{sanghData.length})</h5>
            </div>
            <div>
              {clear.length > 0 && <button type="button" className="btn btn-light mx-1" onClick={handleClearButtonClick}>Clear</button>}
              <button type="button" className="btn btn-light mx-1" onClick={() => {
                setselectedSangh(clear); setLoading(true); closesidebar()
                {console.log(clear)}
              }}>Apply</button>
            </div>
          </div>

          <div className='container-fluied shadow-sm p-1'>
            <FontAwesomeIcon icon={faSearch} className='mx-2' />
            <input
              type='search'
              className='w-75 border-0'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredArray.map((data, index) => {
          const sanghId = data.SanghID || index;
          // const checkboxId = `checkbox-${sanghId}`;
          return (<div key={sanghId} className='container-fluied d-flex'>
            <div className='mx-3 d-flex align-items-center'>
              <input type="checkbox" value="" id={sanghId} onChange={() => handleCheckboxChange(sanghId)} checked={clear.includes(sanghId)} />
            </div>
            <div className='h-auto'>
              <p className='text-primary fw-normal'>{data.ReceiptName}</p>
              <p className='fw-light'>{data.RegisteredAddress}</p>
            </div>
          </div>)
        })}
      </div>
    </>
  )
}

export default SidebarSangh
