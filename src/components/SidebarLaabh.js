import React, { useState, useEffect } from 'react'
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';

const SidebarLaabh = ({ laabhbar, sanghData, closesidebar, setSelectedLaabh, selectedLaabh, settotalLaabh, setLoading }) => {

    const [clear, setClear] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckboxChange = (laabhId) => {
        const checkboxKey = `${laabhId}`;

        setClear((prevClear) => {
            if (prevClear.includes(checkboxKey)) {
                return prevClear.filter((key) => key !== checkboxKey);
            } else {
                return [...prevClear, checkboxKey];
            }
        });
    };

    const handleClearButtonClick = () => {
        setClear([]);
        setSelectedLaabh([]);
        setLoading(true)
    };

    const allLaabhJson = sanghData.LaabhJson || [];

    for (let i = 0; i < sanghData.length; i++) {
        allLaabhJson.push(sanghData[i].LaabhJson);
    }
    const flattenedArray = allLaabhJson.flat();

    const uniqueLaabhData = flattenedArray.reduce((accumulator, current) => {
        const laabhID = current.LaabhID;
        if (!accumulator[laabhID]) {
            accumulator[laabhID] = current;
        }
        return accumulator;
    }, {});

    const uniqueLaabhArray = Object.values(uniqueLaabhData);

    const sortedArray = uniqueLaabhArray.sort((a, b) => {
        const nameA = a.LaabhKhatuEnglish.toLowerCase();
        const nameB = b.LaabhKhatuEnglish.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const filteredArray = sortedArray.filter((Laabh) => {
        const searchString = `${Laabh.LaabhKhatuEnglish} ${Laabh.LaabhKhatuGujarati}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        settotalLaabh(selectedLaabh.length)
    }, [selectedLaabh.length]);

    return (
        <>
            <div className={`sidebar ${laabhbar ? 'sidebar--open' : ''} overflow-auto`}>

                <div className='position-sticky top-0 bg-light'>
                    <div className='container-fluied d-flex justify-content-between align-items-center shadow-sm p-1 bg-body rounded'>
                        <div className='d-flex justify-content-between align-items-center mx-1'>
                            <FontAwesomeIcon icon={faCircleXmark} className='mx-1' onClick={closesidebar} />
                            <h5 className='mx-1'>Laabh({clear.length}/{filteredArray.length})</h5>
                        </div>
                        <div>
                            {clear.length > 0 && <button type="button" className="btn btn-light mx-1" onClick={handleClearButtonClick}>Clear</button>}
                            <button type="button" className="btn btn-light mx-1" onClick={() => { setSelectedLaabh(clear); closesidebar(); setLoading(true)}}>Apply</button>
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

                {filteredArray.map((Laabh, index) => (
                    <div key={index} className='container-fluid d-flex'>
                        <div className='mx-3 d-flex align-items-center'>
                            <input
                                type="checkbox"
                                value=""
                                id={`${Laabh.LaabhID}`}
                                onChange={() => handleCheckboxChange(Laabh.LaabhID)}
                                checked={clear.includes(`${Laabh.LaabhID}`)}
                            />
                        </div>
                        <div className=''>
                            <p className='fw-normal'>{Laabh.LaabhKhatuEnglish}</p>
                            <p className='fw-light'>{Laabh.LaabhKhatuGujarati}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SidebarLaabh
