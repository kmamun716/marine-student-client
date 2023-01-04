import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePhoto = ({ details, refetch, setPhotoModal }) => {
  const token = localStorage.getItem('authToken');
  const [image, setImage] = useState(details?.personal_info?.photo);
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', image);
    try {
      const result = await axios.put("http://localhost:4000/api/v1/student/editPhoto", formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if(result?.status === 200){
        toast.success(result?.data?.message);
        refetch();
        setPhotoModal(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <input type="checkbox" id="edit-photo-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="edit-photo-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Photo:</span>
              </label>
              <input
                type="file"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setImage(e.target.files[0])}
                name="photo"
                required
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

export default ChangePhoto;