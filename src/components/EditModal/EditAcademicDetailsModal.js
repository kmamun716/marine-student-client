import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { host } from "../shared/host";
import setAuthHeader from "../shared/setAuthHeader";

const EditAcademicDetailsModal = ({ data, setModalOpen, refetch }) => {
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({
    academicStatus: data?.academicStatus,
    passingYear: data?.passingYear,
  });
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthHeader(token)
    try {
      const result = await axios.put(`${host}/api/v1/student/editBasic`, editData,);
      if (result?.status === 201) {
        refetch(true)
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
        id="edit-academic-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-academic-details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Course Name:</span>
              </label>
              <input
                type="text"
                placeholder="Course Name"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.course}
                disabled
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Intake:</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.intake}
                disabled
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Select Status:</span>
              </label>
              <select
                onChange={handleChange}
                name="academicStatus"
                className="select select-bordered w-64 max-w-xs"
                defaultValue={editData?.academicStatus}
              >
                <option disabled>
                  Select One
                </option>
                <option value="student">Running</option>
                <option value="passed">Completed</option>
              </select>
            </div>
            {editData?.status === "passed" && (
              <div className="form-control w-64 max-w-xs">
                <label className="label">
                  <span className="label-text">Passing Year :</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-64 max-w-xs"
                  defaultValue={editData?.passingYear}
                  onChange={handleChange}
                  name="passingYear"
                />
              </div>
            )}
            <div className="form-control w-64 max-w-xs my-2">
              <input type="submit" className="btn btn-accent" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAcademicDetailsModal;
