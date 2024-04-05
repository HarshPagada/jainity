import React, { useContext } from 'react'

const CheckOut = (props) => {

    const { sangh, buttonRef, handleClick } = props;

    return (
        <div>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={buttonRef}
                data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">{sangh.DisplayNameEnglish}</h1>
                        </div>
                        <div className="modal-body text-center">
                            Are you sure, you want to clear all entered amount?
                        </div>
                        <div className="modal-footer text-center">
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Yes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
