import { faMapMarkerAlt, faPenToSquare, faDharmachakra, faSquarePlus, faEllipsisV, faTrash, faHeartCircleBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Donate = () => {

  const [dataFromLocalStorage, setDataFromLocalStorage] = useState([]);
  const [sanghID, setSanghID] = useState(null);
  const [sanghBankData, setSanghBankData] = useState([]);
  const [sum, setSum] = useState(0);
  const [laabh, setlaabh] = useState([]);
  const [objtotal, setobjTotal] = useState(0);

  const location = useLocation();

  useEffect(() => {



    const LaabhData = JSON.parse(localStorage.getItem('keyDetail'));
    const str = LaabhData.filter((init) => init.split('_')[1] == location.search.replace('?', ''))
    const arr = str.map((self) => {
      return JSON.parse(localStorage.getItem(self))
    })
    setlaabh(arr)

    setobjTotal(arr.length)

    const total = arr.reduce((acc, obj) => acc + obj.value, 0);
    setSum(total)

  }, []);


  const handleDelete = (index, laabhIndex) => {
    //   const keyDetail = JSON.parse(localStorage.getItem('keyDetail')); 50
    //   

    //   if (index >= 0 && index < keyDetail.length) { 50
    //     const detail = keyDetail[index];
    //     localStorage.removeItem(detail); 50

    //     const updatedKeyDetail = keyDetail.filter((_, i) => i !== index); 50
    //      50
    //     localStorage.setItem('keyDetail', JSON.stringify(updatedKeyDetail)); 50

    //     const updatedLaabh = updatedKeyDetail.map(detail => JSON.parse(localStorage.getItem(detail)));
    //     setlaabh(updatedLaabh)

    //     setobjTotal(updatedLaabh.length)

    //   const total = updatedLaabh.reduce((acc, obj) => acc + obj.value, 0);
    //   setSum(total)


    // } else {
    //     
    // }  
    const updatedSanghBankData = sanghBankData.map((e, i) => {
      const updatedLabh = e.LaabhJson.filter((ce, ci) => ci != laabhIndex);
      const sum = updatedLabh.reduce((acc, curr) => curr.amount ? acc + curr.amount : acc, 0);
      const selectedLaabh = updatedLabh.length;
      return i == index ? { ...e, LaabhJson: updatedLabh, sum, selectedLaabh } : e
    })
    setSanghBankData(updatedSanghBankData)
    localStorage.setItem("donateSangh", JSON.stringify(updatedSanghBankData))
    const savedKeys = JSON.parse(localStorage.getItem("keyDetail"))
    const deletAbleSangh = sanghBankData[index];
    const deletAbleLaabh = deletAbleSangh.LaabhJson[laabhIndex]
    // tableData_${sangh.SanghID}_${laabhID}
    const deletAbleKey = savedKeys.find((e) => e.includes(deletAbleSangh.SanghID) && e.includes(deletAbleLaabh.LaabhID))
    localStorage.removeItem(deletAbleKey)
    const updatedKeys = savedKeys.filter((e) => e != deletAbleKey)
    localStorage.setItem("keyDetail", JSON.stringify(updatedKeys))

  };

  // useEffect(() => {
  //   const total = localStorage.getItem('sum');
  //   if (total) {
  //     setSum(JSON.parse(total));
  //   }
  // }, [setSum]);

  useEffect(() => {
    const storedData = localStorage.getItem('sanghData');
    if (storedData) {
      setDataFromLocalStorage(JSON.parse(storedData));
    }

    const index = localStorage.getItem('id');
    if (index) {
      const parsedIndex = JSON.parse(index);

      if (parsedIndex !== sanghID) {
        setSanghID(parsedIndex);
      }
    }
  }, [sanghID]);


  useEffect(() => {
    // const currentSangh = dataFromLocalStorage.find(sangh => sangh.SanghID === sanghID);

    // const sanghArray = currentSangh ? [currentSangh] : [];
    // setSanghBankData(dataFromLocalStorage);

    const storedDonateSangh = JSON.parse(localStorage.getItem("donateSangh"));
    const isSpecific = location.search;
    if (isSpecific) {
      setSanghBankData([storedDonateSangh.find(sangh => sangh.SanghID === sanghID)]);
    } else {
      setSanghBankData(storedDonateSangh);
    }

  }, [dataFromLocalStorage, sanghID]);

  if (!Array.isArray(sanghBankData)) {
    return <p>No Bank data found for the specified SanghID</p>;
  }

  return (
    <>
      {sanghBankData.map((data, index) => (
        <div key={data?.SanghID}>
          <h3 className='text-center'>Donate {data?.sum} towards {data?.selectedLaabh} Laabh at {data?.SanghID} Sangh</h3>
          <div className='conatiner-fluid d-flex justify-content-center flex-sm-column flex-md-row' style={{ flexDirection: window.innerWidth < 1100 ? 'column-reverse' : 'row-reverse' }}>
            <div className='mx-4 rounded border border-secondary my-3 shadow-sm p-2'>
              <div className='d-flex mx-2 my-2 justify-content-between'>{data?.DisplayNameEnglish}
                <div>
                  <FontAwesomeIcon icon={faPenToSquare} className='mx-2' />
                  <FontAwesomeIcon icon={faEllipsisV} className=' dropdown-toggle' data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="#">Contact us</Link>
                    <Link className="dropdown-item" to="#">Contact sangh</Link>
                    <Link className="dropdown-item" to="#">Report</Link>
                  </div>
                </div>
              </div>
              <div className='text-center my-2'> <FontAwesomeIcon icon={faMapMarkerAlt} className='text-danger mx-2' />{data?.RegisteredAddress}</div>
              <div className='mx-2 my-2'>Phone Number {data?.PhoneNumber1} Mobile {data?.MobileNumber1} Registration {data?.RegistrationNumber} PAN {data?.PanNumber} TaxDeduction {data?.TaxDeduction}</div>
              {/* <Table></Table> */}
              <table className="table table-bordered border-danger">
                <thead className='text-center'>
                  <tr>
                    <th>Laabh</th>
                    <th>₹Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.LaabhJson?.map((list, laabhIndex) => (
                    <tr key={laabhIndex}>
                      <td><FontAwesomeIcon icon={faHeartCircleBolt} />{list?.LaabhKhatuEnglish} <br />{list?.LaabhKhatuGujarati}</td>
                      <td className=''>{list.amount}<FontAwesomeIcon className='my-2 mx-1' icon={faTrash} onClick={() => handleDelete(index, laabhIndex)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className='text-primary fw-bold mx-2 my-2'>Laabharthi (લાભાર્થી), in the name of</p>

              <div className='d-flex align-items-center justify-content-between my-3'>
                <div>
                  <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckChecked" />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Same as Laabharthi
                  </label>
                </div>
                <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" />
                <label className="btn btn-outline-success mx-2" htmlFor="btncheck1">Anonymous</label>
              </div>

              <div className='mx-2'>
                <table className='table table-bordered'>
                  <tbody>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="First Name *" /></td></tr>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="Middle Name of Initial" /></td></tr>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="Last Name *" /></td></tr>
                  </tbody>
                </table>
              </div>

              <p className='text-primary fw-bold mx-2'>Account Details of Sangh</p>

              <div>
                {data?.BankAccountJson && data?.BankAccountJson.map((item, index) => (
                  <table className='table table-bordered border-dark' key={index}>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{item.BankAccountName}</td>
                      </tr>

                      <tr>
                        <td>Account Number</td>
                        <td>{item.BankAccountNumber}</td>
                      </tr>

                      <tr>
                        <td>Bank IFSC Code</td>
                        <td>{item.IFSCCode}</td>
                      </tr>

                      <tr>
                        <td>Bank</td>
                        <td>{item.BankName}</td>
                      </tr>

                      <tr>
                        <td>Bank Branch	</td>
                        <td>{item.BankBranch}</td>
                      </tr>

                      <tr>
                        <td>Bank City	</td>
                        <td>{item.BankCity}</td>
                      </tr>

                    </tbody>
                  </table>
                ))}
              </div>
              <button type='button' className='rounded btn btn-primary btn-sm d-block m-auto my-2' >
                <FontAwesomeIcon icon={faDharmachakra} /> ₹ Donate {data?.sum}
              </button>
            </div>


            <div className='mx-4 rounded border border-secondary my-3' style={{ "height": "fit-content" }}>
              <p className='text-primary fw-bold mx-2'>Payment By</p>
              <p className='mx-2'>(Name and address of Payee. Receipt will be issued on below given name and address)</p>
              <div className='mx-2'>
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <td>
                        <span className='text-danger fw-bold text-center'><FontAwesomeIcon icon={faSquarePlus} />Please create donor</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className='teaxt-primary fw-bold mx-2 my-2'>Laabharthi (લાભાર્થી), in the name of</p>
              <div className='d-flex align-items-center justify-content-between my-3 mx-2'>
                <div>
                  <input className="form-check-input mx-1" type="checkbox" value="" id="flexCheckChecked2" />
                  <label className="form-check-label" htmlFor="flexCheckChecked2">
                    Same as payment by
                  </label>
                </div>
                <input type="checkbox" className="btn-check mx-2" id="btncheck2" autoComplete="off" />
                <label className="btn btn-outline-success" htmlFor="btncheck2">Anonymous</label>
              </div>
              <div className='mx-2'>
                <table className='table table-bordered'>
                  <tbody>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="First Name *" /></td></tr>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="Middle Name of Initial" /></td></tr>
                    <tr><td><input className="form-control border-light w-100 form-control-sm" id='field' type="text" placeholder="Last Name *" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div >
      ))}
    </>
  )
}

export default Donate

