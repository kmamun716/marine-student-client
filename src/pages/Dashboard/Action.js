import React, { useState } from 'react';

const Action = ({ student, refetch }) => {
    const [data, setData] = useState({
        status: student?.status,
        role: student?.role
    });
    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(data)
    }
    return (
        <div>
            <input type="checkbox" id="edit-action-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="edit-action-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <p>Name: {student?.name}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Change Role:</span>
                            </label>
                            <select name='role' defaultValue={data?.role} onChange={handleChange} className="select select-bordered">
                                <option disabled>Pick one</option>
                                <option value='admin'>Admin</option>
                                <option value='moderator'>Moderator</option>
                                <option value='user'>User</option>
                            </select>
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Change Status:</span>
                            </label>
                            <select name='status' defaultValue={data?.status} onChange={handleChange} className="select select-bordered">
                                <option disabled>Pick one</option>
                                <option value='pending'>Pending</option>
                                <option value='active'>Active</option>
                            </select>
                        </div>
                        <div className="form-control w-64 max-w-xs my-2">
                            <input type="submit" className="btn btn-accent" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Action;