import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddAcademicDetails = () => {
    const [select, setSelect] = useState('student');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div>
            <h2 className="text-center mb-2 underline">Add Academic Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 flex-col lg:flex-row mb-2">
                    <div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Course Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Course Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("course", { required: true })}
                            />
                            {errors?.course && <p className="text-red-500">Course Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Intake No:</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Intake No"
                                className="input input-bordered w-full max-w-xs"
                                {...register("intake", { required: true })}
                            />
                            {errors?.intake && <p className="text-red-500">Intake No is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Select Status:</span>
                            </label>
                            <select
                                {...register("status", { required: true })}
                                onChange={e=>setSelect(e.target.value)}
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option disabled>Select One</option>
                                <option value="student">Running</option>
                                <option value="passed">Completed</option>
                            </select>
                            {errors?.status && <p className="text-red-500">Educational Status is Required</p>}
                        </div>
                        {
                            select === 'passed' && <div className="form-control w-64 max-w-xs">
                                <label className="label">
                                    <span className="label-text">Passing Year:</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Passing Year"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("passingYear")}
                                />
                            </div>
                        }
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

export default AddAcademicDetails;