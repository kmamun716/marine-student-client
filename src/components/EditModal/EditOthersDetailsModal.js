import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { host } from "../shared/host";
import setAuthHeader from "../shared/setAuthHeader";

const EditOthersDetailsModal = ({ data, setModalOpen, refetch }) => {
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({
    name: data?.name,
    relation: data?.relation,
    mobile: data?.mobile,
    email: data?.email,
    facebook: data?.facebook,
    whatsApp: data?.whatsApp,
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
      const result = await axios.put(`${host}/api/v1/external/others/edit`, editData);
      if (result?.status === 201) {
        refetch()
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
        id="edit-others-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-others-details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Relation:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.relation}
                onChange={handleChange}
                name="relation"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.email}
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
                defaultValue={data?.mobile}
                onChange={handleChange}
                name="mobile"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Facebook ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.facebook}
                onChange={handleChange}
                name="facebook"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Whatsapp:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.whatsApp}
                onChange={handleChange}
                name="whatsApp"
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

export default EditOthersDetailsModal;
