import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BasicEdit = ({ details, setModalOpen, refetch }) => {
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({
    name: details?.name,
    email: details?.email,
    mobile: details?.mobile,
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
        "http://localhost:4000/api/v1/student/editBasic",
        editData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
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
      <input type="checkbox" id="edit-basic-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-basic-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={details?.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={details?.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Mobile:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={details?.mobile}
                onChange={handleChange}
                name="mobile"
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

export default BasicEdit;
