import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { host } from '../../components/shared/host';
import setAuthHeader from '../../components/shared/setAuthHeader';

const ChangePassword = () => {
    const token = localStorage.getItem('authToken');
    const [values, setValues] = useState({
        currentPassword: '',
        newPassword: '',
        newConfirmPassword: ''
    });
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const { currentPassword, newPassword } = values;
        if (currentPassword === newPassword) {
            toast.error("New Password can't be same as old password")
        } else {
            try {
                setAuthHeader(token);
                const result = await axios.put(`${host}/api/v1/auth/changePassword`, { currentPassword, newPassword });
                if (result.status === 200) {
                    toast.success(result.data.message);
                    e.target.reset();
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div>
            <h2 className='text-xl font-bold underline'>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Current Password</span>
                    </label>
                    <input name='currentPassword' onChange={handleChange} type="password" placeholder="Enter Current Password" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">New Password</span>
                    </label>
                    <input name='newPassword' onChange={handleChange} type="password" placeholder="Enter New Password" required className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Confirm New Password</span>
                    </label>
                    <input name='newConfirmPassword' onChange={handleChange} type="password" placeholder="Type New Password Again" className="input input-bordered w-full max-w-xs" />
                    {values.newPassword !== values.newConfirmPassword && <p className='text-red-500 font-bold'>New Password Not Matched!</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <input disabled={values.newPassword !== values.newConfirmPassword} type="submit" className="btn btn-accent mt-2" value="Change Password" />
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;