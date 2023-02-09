import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { host } from '../../components/shared/host';
import setAuthHeader from '../../components/shared/setAuthHeader';

const AddOtherDetails = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        setAuthHeader(token)
        try {
            const res = await axios.post(`${host}/api/v1/external/others/add`, data);
            if (res?.status === 201) {
                toast.success('Emmergency Contact Details Created Successfully');
                navigate('/dashboard')
            }
        } catch (err) {
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message)
            }
        }
    }
    return (
        <div>
            <h2 className="text-center mb-2 underline">Add Emergency Contact Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 flex-col lg:flex-row mb-2">
                    <div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", { required: true })}
                            />
                            {errors?.name && <p className="text-red-500">Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Relation:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="relation"
                                className="input input-bordered w-full max-w-xs"
                                {...register("relation", { required: true })}
                            />
                            {errors?.relaiton && <p className="text-red-500">Relation is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Mobile No:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Mobile No For Contact"
                                className="input input-bordered w-full max-w-xs"
                                {...register("mobile", { required: true })}
                            />
                            {errors?.mobile && <p className="text-red-500">Mobile No is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Corresponding Email:</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", { required: true })}
                            />
                            {errors?.email && <p className="text-red-500">Valid Email is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Whatsapp No (optional):</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Active Whatsapp Number"
                                className="input input-bordered w-full max-w-xs"
                                {...register("whatsApp")}
                            />
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Facebook (optional):</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Facebook ID"
                                className="input input-bordered w-full max-w-xs"
                                {...register("facebook")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="form-control w-64 max-w-xs">
                        <input className="btn btn-info" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddOtherDetails;