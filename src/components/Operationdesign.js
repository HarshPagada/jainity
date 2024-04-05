import { faEllipsisV, faMapMarkerAlt, faDharmachakra, faSitemap, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Table from './Table'
import CheckOut from './CheckOut'
import spinner from '../spinner.svg'
import DataContext from './DataContext'

const Operationdesign = (props) => {

    const { sum, setSum, onTotalSelectedLaabhCountChange, setLoading, loading, pullData } = props;

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [Value, setValue] = useState({});
    const [showRows, setShowRows] = useState(true);
    const [idbtn, setIdbtn] = useState(null);

    useEffect(() => {

        setData((tempData) => {
            const reFillSanghData = tempData.map((sanghObj) => {
                sanghObj.sum = sanghObj.LaabhJson.reduce((acc, curr) => curr.amount ? acc + curr.amount : acc, 0)
                sanghObj.selectedLaabh = sanghObj.LaabhJson.filter((a) => a.amount).length
                return sanghObj
            })
            return reFillSanghData;
        });
        setTimeout(() => {
            localStorage.setItem('sanghData', JSON.stringify(data));
            setSum(data.reduce((acc, curr)=> acc += curr.LaabhJson.reduce((cA,cC)=>cC.amount ? cA += cC.amount : cA ,0) , 0))
            pullData(data)
        }, 100);
    }, [setSum,pullData]);


    useEffect(() => {
        axios.get('https://demo.api.jainity.com/api/sangh/sangh_explorer_list', {

            headers: {
                'x-rapidapi-host': 'demo.api.jainity.com',
                'Jainity_api_key': process.env.REACT_APP_KEY,
            },
            params: {
                SanghSlug: '',
                SanghIDs: props.selectedsangh,
                LaabhIDs: props.selectedLaabh,
                EligibleForTaxDeduction: props.textdirection,
                Keyword: '',
                SortBy: props.sorting,
                SkipCount: 0,
                LimitCount: 20,
                PageType: '',
                application: undefined,
                timestamp: 1708163438143
            },
        })
            .then((res) => {
                const keys = JSON.parse(localStorage.getItem('keyDetail'))
                const savDetail = keys?.map((k) => ({ ...JSON.parse(localStorage.getItem(k)), id: k }))
                // console.log(savDetail)
                const newObj = {}
                savDetail?.forEach(element => {
                    const si = element.id.split('_')[1]
                    const li = element.id.split('_')[2]
                    newObj[si] = newObj[si] ? [...newObj[si], { li, amount: element.value }] : [{ li, amount: element.value }]

                });
                // console.log('obj', newObj)

                setData(res.data.data.list.map((i) => {
                    return newObj[i.SanghID] ? {
                        ...i, LaabhJson: i.LaabhJson.map((z) => {
                            const saveLaabh = newObj[i.SanghID].find((x) => x.li == z.LaabhID)
                            return saveLaabh ? { ...z, amount: saveLaabh.amount } : z
                        })
                    } : i
                }));
                setLoading(false)
                props.onOperationalData(res.data.data);
                console.log(res.data)
                props.setSanghData(res.data.data.list)
            })

            .catch((error) => {
                setError(error.message || 'An error occurred while fetching data.');
                setLoading(false)
            });

    }, [props.textdirection, props.sorting, props.selectedsangh, props.selectedLaabh]);

    // const totalValue = (total, SanghID) => {
    //     settotalVal((prevValues) => ({
    //         ...prevValues,
    //         [SanghID]: total,
    //     }));
    // };


    // modal 
    const buttonRef = useRef(null);

    const updateNote = (sI) => {
        if (buttonRef.current) {
            setIdbtn(sI)
            buttonRef.current.click();
            // console.log('Button clicked in parent', buttonRef);
        } else {
            console.log('Button reference not yet available');
        }
    };

    const handleClick = () => {
        const keys = JSON.parse(localStorage.getItem('keyDetail'))
        const ls = keys?.filter((u) => u.split('_')[1] == idbtn)
        ls?.forEach((element) => {
            localStorage.removeItem(element)
        })
        localStorage.setItem("keyDetail", JSON.stringify(keys?.filter((u) => u.split('_')[1] != idbtn)));
        setData(data.map((q) => (q.SanghID == idbtn ? { ...q, sum: 0, LaabhJson: q.LaabhJson.map((n) => ({ ...n, amount: undefined })) } : q)))
        // setSum(0)
        updateNote();
    };

    useEffect(() => {
        if (buttonRef.current) {
            updateNote();
            console.log(Value)
        }
    }, [buttonRef, setValue]);

    // useEffect(() => {
    //     settotalDelete(() => updateNote)
    // }, []);


    return (
        <>
            {/* <DataContext.Provider value={data}> */}

                {loading && <div className="text-center">
                    <img src={spinner} className='align-center' />
                    <span className="visually-hidden">Loading...</span>
                </div>}
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {Array.isArray(data) && data.map((sangh, index) => {
                    return (<div key={sangh.id} className='mx-3 rounded border border-secondary my-3 shadow-sm'>
                        {props.showTable[sangh.SanghID] && <CheckOut sangh={sangh} handleClick={handleClick} buttonRef={buttonRef} />}
                        {/* || props.showAllTables[sangh.SanghID]  */}
                        <div className=' d-flex justify-content-between align-items-center '>
                            <p className='align-items-center'><FontAwesomeIcon icon={faSitemap} className='mx-2' />{sangh.DisplayNameEnglish}</p>

                            <FontAwesomeIcon icon={faEllipsisV} className='mx-3 mx-2 dropdown-toggle' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="#">Contact us</Link>
                                <Link className="dropdown-item" to="#">Contact sangh</Link>
                                <Link className="dropdown-item" to="#">Report</Link>
                            </div>

                        </div>
                        <div className='d-flex'>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className='mx-2 my-1 text-danger' />
                            <p>{sangh.RegisteredAddress}</p>
                        </div>
                        <div className='mx-2'>
                            <p>Registration {sangh.RegistrationNumber}  {sangh.PanNumber ? `PAN ${sangh.PanNumber}` : ''} Tax Deduction {sangh.TaxDeduction ? sangh.TaxDeduction : 'N/A'}</p>
                        </div>
                        <div className=' d-flex justify-content-between my-3'>
                            {sangh.SanghID && (<Link className='mx-2' onClick={() => props.toggleTable(sangh.SanghID)}>
                                {props.showAllTables || props.showTable[sangh.SanghID] ? (
                                    <>
                                        <FontAwesomeIcon icon={faEyeSlash} /> Hide
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faEye} /> Show
                                    </>
                                )}
                            </Link>)}

                            <div className='d-flex justify-content-between'>
                                See Selected Laabh ({sangh.selectedLaabh || 0}/{sangh.LaabhJson.length})
                                <div className="form-check form-switch mx-2">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" onChange={() => setShowRows(!showRows)} />
                                </div>

                                <Link type='button' className={`mx-2 rounded btn btn-primary btn-sm ${sum === 0 ? 'disabled-link' : ''}`}
                                    to={sum !== 0 ? { pathname: '/Donate', search: `${sangh.SanghID}`, } : '#'} >
                                    <FontAwesomeIcon icon={faDharmachakra} /> ₹ {sangh.sum ? `Donate ${sangh.sum}` : "0"}
                                </Link>

                                {sangh.sum ? <FontAwesomeIcon className='my-2 mx-1' onClick={() => updateNote(sangh.SanghID)} icon={faTrash} /> : null}
                            </div>
                        </div>
                        {(props.showTable[sangh.SanghID] || props.showAllTables) && <Table sangh={sangh} sanghID={sangh.SanghID}
                            Value={Value} setValue={setValue} setSum={props.setSum} setData={setData} index={index}
                            onTotalSelectedLaabhCountChange={onTotalSelectedLaabhCountChange} showRows={showRows}
                            pullData={pullData} laabh={data}  //totalValue={(total) => totalValue(total, sangh.SanghID)}
                        />}
                    </div>
                    )
                    return null;
                })}
            {/* </DataContext.Provider> */}
        </>
    )
}

export default Operationdesign;
