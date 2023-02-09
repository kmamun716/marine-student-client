import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { host } from "../shared/host";
import setAuthHeader from "../shared/setAuthHeader";

const EditPersonalDetailsModal = ({ data, setModalOpen, refetch }) => {
  const token = localStorage.getItem("authToken");
  const [editData, setEditData] = useState({
    father: data?.father,
    mother: data?.mother,
    presentRoad: data?.presentRoad,
    presentDistrict: data?.presentDistrict,
    presentCountry: data?.presentCountry,
    nId: data?.nId,
    facebook: data?.facebook,
    whatsApp: data?.whatsApp,
    linkedIn: data?.linkedIn,
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
      const result = await axios.put(`${host}/api/v1/student/editPersonal`, editData);
      if(result?.status === 201){
        refetch(true)
        toast.success(result?.data?.message)
      }
    } catch (err) {
      if(err?.response?.status === 400){
        toast.error(err?.response?.data?.message)
      }
    }
    setModalOpen(false);
  };
  return (
    <div>
      <input
        type="checkbox"
        id="edit-personal-details-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-personal-details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Father Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.father}
                onChange={handleChange}
                name="father"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Mother Name:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.mother}
                onChange={handleChange}
                name="mother"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Present Address:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.presentRoad}
                onChange={handleChange}
                name="presentRoad"
                placeholder="Road No or Name and State"
              />
              <input
                type="text"
                className="input input-bordered my-1 w-full max-w-xs"
                defaultValue={data?.presentDistrict}
                onChange={handleChange}
                name="presentDistrict"
                placeholder="Present District"
              />
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.presentCountry}
                onChange={handleChange}
                name="presentCountry"
                placeholder="Present Country"
              />
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">National ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.nId}
                onChange={handleChange}
                name="nId"
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
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Linkedin ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.linkedIn}
                onChange={handleChange}
                name="linkedIn"
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

export default EditPersonalDetailsModal;
