import React from "react";
import { useForm } from "react-hook-form";

const AddPersonalDetails = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-64 max-w-xs">
          <label className="label">
            <span className="label-text">Father's Name</span>
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
            <span className="label-text">Mother's Name</span>
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
            <span className="label-text">Relegion</span>
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
            <span className="label-text">National Id No</span>
          </label>
          <input
            type="text"
            placeholder="Your Nation ID"
            className="input input-bordered w-full max-w-xs"
            {...register("father", { required: true })}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPersonalDetails;
