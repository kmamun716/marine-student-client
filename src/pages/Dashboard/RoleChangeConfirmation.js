import React from 'react';

const RoleChangeConfirmation = ({ details, changeQuery }) => {
    return (
        <div>
            <input type="checkbox" id="role-change-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <p className='mb-2'>Are you sure to change this user role?</p>
                    <label htmlFor="role-change-modal" onClick={()=>changeQuery({ role: details.role }, details.id)} className='btn btn-success btn-sm'>Yes</label> <label htmlFor="role-change-modal" className='btn btn-warning btn-sm'>No</label>
                </div>
            </div>
        </div>
    );
};

export default RoleChangeConfirmation;