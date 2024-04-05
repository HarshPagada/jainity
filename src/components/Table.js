import { faHeartCircleBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import React from 'react'
import { json } from 'react-router-dom'

const Table = (props) => {
    const { Value, setValue } = props;
    const { sangh, totalValue, setData, index, showRows, pullData, laabh } = props;

    const onChange = (e, laabhID, childIndex) => {
        let newValue = parseFloat(e.target.value) || '';
        setValue((prevValue) => ({ ...prevValue, [laabhID]: newValue }));

        setData((tempData) => {
            tempData[index].LaabhJson[childIndex].amount = newValue
            tempData[index].sum = tempData[index].LaabhJson.reduce((acc, curr) => curr.amount ? acc + curr.amount : acc, 0)
            tempData[index].selectedLaabh = tempData[index].LaabhJson.filter((a) => a.amount).length
            const storedDonateSangh = JSON.parse(localStorage.getItem("donateSangh"));
            const changeAbleSangh = tempData[index];
            const changeAbleLabh = changeAbleSangh.LaabhJson[childIndex];
            if (storedDonateSangh?.length) {
                const isSanghExistInDonate = storedDonateSangh.find((e) => e.SanghID == changeAbleSangh.SanghID)
                if (isSanghExistInDonate) {
                    const existedSanghLabh = isSanghExistInDonate.LaabhJson;
                    const isLabhExist = existedSanghLabh.find((e) => e.LaabhID == changeAbleLabh.LaabhID)
                    let updatedSanghLabh = []
                    if (isLabhExist) {
                        updatedSanghLabh = existedSanghLabh.map((e) => e.LaabhID == isLabhExist.LaabhID ? { ...changeAbleLabh } : e)
                    } else {
                        updatedSanghLabh = [...existedSanghLabh, changeAbleLabh]
                    }
                    localStorage.setItem("donateSangh", JSON.stringify([...storedDonateSangh.map((e) => e.SanghID == changeAbleSangh.SanghID ? { ...changeAbleSangh, LaabhJson: updatedSanghLabh } : e)]))
                } else {
                    localStorage.setItem("donateSangh", JSON.stringify([...storedDonateSangh, { ...changeAbleSangh, LaabhJson: [changeAbleLabh] }]))
                }
            } else {
                localStorage.setItem("donateSangh", JSON.stringify([{ ...changeAbleSangh, LaabhJson: [changeAbleLabh] }]))
            }
            const laabhNameEnglish = tempData[index].LaabhJson[childIndex].LaabhKhatuEnglish;
            const laabhNameGujarati = tempData[index].LaabhJson[childIndex].LaabhKhatuGujarati;

            // Storing data in localStorage
            const localStorageKey = `tableData_${sangh.SanghID}_${laabhID}`;
            const localStorageData = JSON.stringify({
                laabhNameEnglish,
                laabhNameGujarati,
                value: newValue,
            });
            localStorage.setItem(localStorageKey, localStorageData);

            const updatedKeyDetail = JSON.parse(localStorage.getItem("keyDetail"));
            if (updatedKeyDetail) {
                const keyexist = updatedKeyDetail.includes(localStorageKey)
                if (!keyexist) {
                    localStorage.setItem("keyDetail", JSON.stringify([...updatedKeyDetail, localStorageKey]));
                }
            } else {
                localStorage.setItem("keyDetail", JSON.stringify([localStorageKey]));
            }
            return tempData;
        })

        setTimeout(() => {
            pullData(laabh)
        }, 100);
        // setData((tempData)=>([...tempData.map((tempE, tempI)=>(index==tempI?{...tempE,LaabhJson:tempE.LaabhJson[childIndex].amount} : tempE))]))
    };

    // const saveDataInLocal = (tempData, childIndex) => {
    // }
    useEffect(() => {
        let totalSum = Object.values(Value).reduce((acc, curr) => acc + curr, 0);
        props.setSum(totalSum);
        // totalValue(Object.keys(Value).length);

    }, [Value, sangh.SanghID,]);


    return (
        <div className='mainTable w-100 mb-3'>
            <table className="table table-bordered mx-2 ">
                <thead className='text-center'>
                    <tr>
                        <th>Laabh</th>
                        <th>₹Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sangh.LaabhJson.map((laabh, childIndex) => (

                        (showRows || laabh.amount > 0) && (
                            <tr key={laabh.LaabhID}>
                                <td>
                                    <div><FontAwesomeIcon className='mx-2' icon={faHeartCircleBolt} />{laabh.LaabhKhatuEnglish} <br />
                                        <FontAwesomeIcon className='mx-2' icon={faHeartCircleBolt} />{laabh.LaabhKhatuGujarati}</div>
                                </td>
                                <td>
                                    <input className={`form-control border-${laabh.amount > laabh.MaxAmount ? 'danger' : 'light'} w-75 form-control-sm mx-2`} id='field'
                                        name={laabh.LaabhID} value={laabh.amount || ''}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value) || 0;
                                            // if (newValue >= laabh.MaxAmount) {
                                            onChange({ target: { value: newValue } }, laabh.LaabhID, childIndex);
                                            // }
                                        }}
                                        type="number" placeholder="₹ 0,00" aria-label=".form-control-sm example" />
                                    <div className={`mx-2 text-${laabh.amount > laabh.MaxAmount ? 'danger' : 'dark'}`}>(between ₹{laabh.MinAmount} and ₹{laabh.MaxAmount})</div>
                                </td>
                            </tr>)
                    ))}
                    <tr>
                        <td>
                            <p className='mx-2'>{`Selected ${Object.keys(Value).length} / ${sangh.LaabhJson.length} Laabh Options`}</p>
                        </td>
                        <td>
                            <p className='mx-2'>₹{sangh.sum}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Table
