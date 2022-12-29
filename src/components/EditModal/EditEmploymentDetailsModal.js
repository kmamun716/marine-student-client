import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const EditEmploymentDetailsModal = ({ data, setModalOpen }) => {
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({
    companyName: data?.companyName,
    groupName: data?.groupName,
    department: data?.department,
    designation: data?.designation,
    city: data?.city,
    country: data?.country,
    joiningYear: data?.joiningYear,
  });
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        "http://localhost:4000/api/v1/external/employment/edit",
        editData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (result?.status === 201) {
        toast.success(result?.data?.message);
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        toast.error(err?.response?.data?.message);
      }
    }
    setModalOpen(false);
  };
  return (
    <div>
      <input
        type="checkbox"
        id="edit-employment-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-employment-details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Company Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.companyName}
                onChange={handleChange}
                name="companyName"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Group Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.groupName}
                onChange={handleChange}
                name="groupName"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Department :</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.department}
                onChange={handleChange}
                name="department"
              />
            </div>

            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Designation :</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.designation}
                onChange={handleChange}
                name="designation"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">City :</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.city}
                onChange={handleChange}
                name="city"
              />
            </div>

            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Country:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.country}
                onChange={handleChange}
                name="country"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Joining Year:</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.joiningYear}
                onChange={handleChange}
                name="joiningYear"
              />
            </div>

            <div className="form-control w-64 max-w-xs my-2">
              <input type="submit" className="btn btn-accent" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmploymentDetailsModal;
