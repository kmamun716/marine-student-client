import axios from 'axios';
import React, { useState } from 'react';

const ForgotPassword = ({setModalOpen}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(false);
    const handleSubmit=async (e)=>{
        setError('')
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:4000/api/v1/auth/forgotPassword/${email}`);
            if(res.status === 200){
                setError('');
                setMessage(true);
            }
            console.log(res)
        }catch(err){
            setError(err?.response?.data?.message)
        };
        e.target.reset()
    }
    return (
        <div>
            <input type="checkbox" id="forgot-password-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="forgot-password-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={()=>setMessage(false)}
                    >
                        ✕
                    </label>
                    {
                        message ? <div>
                            <p>Reset Link Sent to your Registered Email</p>
                            <p>Please Check Your Email Inbox or Spam Folder</p>
                        </div>:<form className='flex flex-col items-center' onSubmit={handleSubmit}>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Registerd Email:</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Input Your Registerd Email'
                                required
                            />
                        </div>
                        <div>{error && <p className='text-left text-red-500'>{error}</p>}</div>                        
                        <div className="form-control w-64 max-w-xs my-2">
                            <input type="submit" className="btn btn-secondary" value="Send Mail" />
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;