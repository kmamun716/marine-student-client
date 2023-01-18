import React from 'react';

const DeleteConfirmationModal = ({id, handleDelete}) => {
    return (
        <>
            <input type="checkbox" id="delete-confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">Do You Really Want To Delete This Information?</p>
                    <div className="modal-action">
                        <label onClick={()=>handleDelete(id)} htmlFor="delete-confirmation-modal" className="btn btn-info">Yes!</label>
                        <label htmlFor="delete-confirmation-modal" className="btn">No</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmationModal;