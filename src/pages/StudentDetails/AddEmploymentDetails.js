import React from 'react';
import { useForm } from "react-hook-form";

const AddEmploymentDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div>
            <h2 className="text-center mb-2 underline">Add Current Employment Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 flex-col lg:flex-row mb-2">
                    <div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Company Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("companyName", { required: true })}
                            />
                            {errors?.companyName && <p className="text-red-500">Company Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Group Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Group Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("groupName", { required: true })}
                            />
                            {errors?.groupName && <p className="text-red-500">Group Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Designation:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Designation"
                                className="input input-bordered w-full max-w-xs"
                                {...register("designation", { required: true })}
                            />
                            {errors?.designation && <p className="text-red-500">Designation is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Department Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Department Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("department", { required: true })}
                            />
                            {errors?.department && <p className="text-red-500">Department Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">City Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="City Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("city", { required: true })}
                            />
                            {errors?.city && <p className="text-red-500">City Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Country Name:</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Country Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("country", { required: true })}
                            />
                            {errors?.country && <p className="text-red-500">Country Name is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Joining Year:</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Joining Year"
                                className="input input-bordered w-full max-w-xs"
                                {...register("joiningYear", { required: true })}
                            />
                            {errors?.joiningYear && <p className="text-red-500">Year Of Joining is Required</p>}
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

export default AddEmploymentDetails;