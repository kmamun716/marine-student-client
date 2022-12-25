import React from "react";
import { useForm } from "react-hook-form";

const AddPersonalDetails = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Mother's Name:</span>
              </label>
              <input
                type="text"
                placeholder="Mother Name"
                className="input input-bordered w-full max-w-xs"
                {...register("father", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Date Of Birth:</span>
              </label>
              <input
                type="text"
                placeholder="Birthdate"
                className="input input-bordered w-full max-w-xs"
                {...register("birthDate", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Present Address:</span>
              </label>
              <input
                type="text"
                placeholder="Present Address"
                className="input input-bordered w-full max-w-xs"
                {...register("presentAddress", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Permanent Address:</span>
              </label>
              <input
                type="text"
                placeholder="Permanent Address"
                className="input input-bordered w-full max-w-xs"
                {...register("permanentAddress", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">National Id No:</span>
              </label>
              <input
                type="text"
                placeholder="Your Nation ID"
                className="input input-bordered w-full max-w-xs"
                {...register("nId", { required: true })}
              />
            </div>
          </div>
          <div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Relegion:</span>
              </label>
              <input
                type="text"
                placeholder="Relegion"
                className="input input-bordered w-full max-w-xs"
                {...register("father", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Whatsapp No:</span>
              </label>
              <input
                type="text"
                placeholder="Your Whatsapp No"
                className="input input-bordered w-full max-w-xs"
                {...register("whatsapp", { required: true })}
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
                {...register("fbId", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Linkedin ID:</span>
              </label>
              <input
                type="text"
                placeholder="Your Linkedin ID"
                className="input input-bordered w-full max-w-xs"
                {...register("linkedIn", { required: true })}
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Employment Status:</span>
              </label>
              <select
                {...register("employment", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled>Select One</option>
                <option value="employed">Employed</option>
                <option value="unEmployed">Un-Employed</option>
                <option value="business">Business</option>
              </select>
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
