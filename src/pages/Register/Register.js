import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/shared/FormInput';
import { host } from '../../components/shared/host';


const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [academic, setAcademic] = useState('');
    const navigate = useNavigate();
    const onSubmit = async data => {
        const { name, email, password, confirmPassword, course, intake, mobile, gender, academicStatus, passingYear } = data;
        if (password !== confirmPassword) {
            setError('notMatched', { type: 'custom', message: 'Password Not Matched' });
        } else {
            clearErrors()
            try {
                const student = await axios.post(`${host}/api/v1/auth/register`, { name, email, password, course, intake, mobile, gender, academicStatus, passingYear });
                if (student?.status === 201) {
                    toast.success(student?.data?.message)
                    navigate('/login')
                }
            } catch (err) {
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message)
                }
            }
        }
    };
    const onChangeAcademic=e=>{
        setAcademic(e.target.value)
    }
    return (
        <div>
            <h2 className='text-xl text-center'>Register Here</h2>
            <div className='flex flex-col items-center'>
                <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col lg:flex-row gap-2'>
                        <div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Your Name:</span>
                                </label>
                                <FormInput
                                    type='text'
                                    name='name'
                                    placeholder='Type Your Name'
                                    register={register}
                                />
                                {errors?.name && <p className='text-red-500'>Please Input Your Name</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email:</span>
                                </label>
                                <FormInput
                                    type='text'
                                    name='email'
                                    placeholder='Type Your Valid Email'
                                    register={register}
                                />
                                {errors?.email && <p className='text-red-500'>Please Input Valid Email</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password:</span>
                                </label>
                                <FormInput
                                    type='password'
                                    name='password'
                                    placeholder='Enter Your Password'
                                    register={register}
                                />
                                {errors?.password && <p className='text-red-500'>Please Provide Password</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Confirm Password:</span>
                                </label>
                                <FormInput
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Type Password Again'
                                    register={register}
                                />
                                {errors?.confirmPassword && <p className='text-red-500'>Please Provide Confirm Password</p>}
                                {errors?.notMatched && <p className='text-red-500'>{errors?.notMatched?.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Mobile No With Country Code:</span>
                                </label>
                                <FormInput
                                    type='text'
                                    name='mobile'
                                    placeholder='Mobile With Country Code'
                                    register={register}
                                />
                                {errors?.mobile && <p className='text-red-500'>Please Provide Mobile Number</p>}
                            </div>
                        </div>
                        <div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Gender:</span>
                                </label>
                                <select defaultValue='selectGender' {...register("gender")} className="select select-bordered">
                                    <option value='selectGender' disabled>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='others'>Others</option>
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Course Name:</span>
                                </label>
                                <select defaultValue='select' {...register("course")} className="select select-bordered">
                                    <option value="select" disabled>Select Course</option>
                                    <option value="DEMT">DEMT</option>
                                    <option value="DEST">DEST</option>
                                    <option value="MDEA">MDEA</option>
                                    <option value="SBW">SBW</option>
                                    <option value="SBD">SBW</option>
                                    <option value="SF">SF</option>
                                </select>

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Intake:</span>
                                </label>
                                <FormInput
                                    type='number'
                                    name='intake'
                                    placeholder='Intake Number'
                                    register={register}
                                />
                                {errors?.intake && <p className='text-red-500'>Please Provide Intake Number</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Academic Status:</span>
                                </label>
                                <select defaultValue='select' {...register("academicStatus")} className="select select-bordered" onChange={onChangeAcademic}>
                                    <option value="select" disabled>Academic Status</option>
                                    <option value="passed">Passed</option>
                                    <option value="student">Running</option>
                                </select>
                            </div>
                            {
                                academic === "passed" && <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Passing Year:</span>
                                </label>
                                <FormInput
                                    type='number'
                                    name='passingYear'
                                    placeholder='Passing Year'
                                    register={register}
                                />
                            </div>
                            }
                        </div>
                    </div>
                    <input className='btn btn-info my-2' type="submit" value='Register' />
                </form>
                <p>Already Have Account? <Link className="link link-neutral" to='/login'>Login Here</Link></p>
            </div>
        </div>
    );
};

export default Register;