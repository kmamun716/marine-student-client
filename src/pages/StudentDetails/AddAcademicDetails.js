import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/shared/Loading';
import useGetSingleUser from '../../hooks/useGetSingleUser';
import useGetUserById from '../../hooks/useGetUserById';

const AddAcademicDetails = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const [select, setSelect] = useState('student');
    const [student, isLoading] = useGetSingleUser(token);
    const [studentDetails, detailsLoading, refetch] = useGetUserById(student?.id);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            const res = await axios.put('http://localhost:4000/api/v1/student/editBasic', data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (res?.status === 201) {
                navigate('/dashboard')
                toast.success('Academic Details Created Successfully');
            }
        } catch (err) {
            if (err?.response?.status === 400) {
                toast.error(err?.response?.data?.message)
            }
        }
    };
    if(isLoading || detailsLoading){
        return <Loading/>
    }
    console.log(studentDetails)
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
                            {/* <input
                                type="text"
                                placeholder="Course Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("course", { required: true })}
                            /> */}
                            <input
                                type="text"
                                placeholder="Course Name"
                                className="input input-bordered w-full max-w-xs"
                                onChange={()=>{}}
                                value={studentDetails?.course}
                                disabled
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
                                onChange={()=>{}}
                                value={studentDetails?.intake}
                                disabled
                            />
                            {errors?.intake && <p className="text-red-500">Intake No is Required</p>}
                        </div>
                        <div className="form-control w-64 max-w-xs">
                            <label className="label">
                                <span className="label-text">Select Status:</span>
                            </label>
                            <select
                                {...register("academicStatus", { required: true })}
                                onChange={e => setSelect(e.target.value)}
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