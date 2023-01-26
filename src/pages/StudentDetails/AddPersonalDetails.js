import axios from 'axios';
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPersonalDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:4000/api/v1/student/addPersonal', data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (res.status === 201) {
        navigate('/dashboard')
        toast.success('Personal Details Added Successfully');
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
      }
    }
  };
  return (
    <div>
      <h2 className="text-center mb-2 underline">Add Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 flex-col lg:flex-row mb-2">
          <div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Father's Name:</span>
              </label>
              <input
                type="text"
                placeholder="Father Name"
                className="input input-bordered w-full max-w-xs"
                {...register("father", { required: true })}
              />
              {errors?.father && <p className="text-red-500">Father Name is Required</p>}
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Mother's Name:</span>
              </label>
              <input
                type="text"
                placeholder="Mother Name"
                className="input input-bordered w-full max-w-xs"
                {...register("mother", { required: true })}
              />
              {errors?.mother && <p className="text-red-500">Mother Name is Required</p>}
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Date Of Birth:</span>
              </label>
              <input
                type="text"
                placeholder="Birth Date"
                className="input input-bordered w-full max-w-xs"
                {...register("dateOfBirth", { required: true })}
              />
              {errors?.dateOfBirth && <p className="text-red-500">Birth Date is Required</p>}
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Present Address:</span>
              </label>
              <input
                type="text"
                placeholder="Road No or Name and State"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("presentRoad")}
              />
              <input
                type="text"
                placeholder="District"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("presentDistrict")}
              />
              <input
                type="text"
                placeholder="country"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("presentCountry")}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">National Id No (if any):</span>
              </label>
              <input
                type="text"
                placeholder="Your Nation ID"
                className="input input-bordered w-full max-w-xs"
                {...register("nId")}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Blood Group:</span>
              </label>
              <input
                type="text"
                placeholder="Blood Group"
                className="input input-bordered w-full max-w-xs"
                {...register("bloodGroup", { required: true })}
              />
              {errors?.bloodGroup && <p className="text-red-500">Blood Group is Required</p>}
            </div>
            
          </div>
          <div>            
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Whatsapp No:</span>
              </label>
              <input
                type="text"
                placeholder="Your Whatsapp No"
                className="input input-bordered w-full max-w-xs"
                {...register("whatsApp")}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Facebook ID:</span>
              </label>
              <input
                type="text"
                placeholder="Your Facebook ID"
                className="input input-bordered w-full max-w-xs"
                {...register("facebook", { required: true })}
              />
              {errors?.facebook && <p className="text-red-500">Facebook ID is Required</p>}
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Linkedin ID:</span>
              </label>
              <input
                type="text"
                placeholder="Your Linkedin ID"
                className="input input-bordered w-full max-w-xs"
                {...register("linkedIn")}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Permanent Address:</span>
              </label>
              <input
                type="text"
                placeholder="Road No or Name and state"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("permanentRoad")}
              />
              <input
                type="text"
                placeholder="District"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("permanentDistrict")}
              />
              <input
                type="text"
                placeholder="country"
                className="input input-bordered input-sm w-full max-w-xs"
                {...register("permanentCountry")}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Current Employment Status:</span>
              </label>
              <select
                {...register("employmentStatus", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled>Select One</option>
                <option value="employed">Employed</option>
                <option value="unEmployed">Un-Employed</option>
                <option value="business">Business</option>
              </select>
              {errors?.employmentStatus && <p className="text-red-500">Employment Status is Required</p>}
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

export default AddPersonalDetails;
