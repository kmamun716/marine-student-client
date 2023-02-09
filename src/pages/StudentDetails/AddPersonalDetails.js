import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { host } from '../../components/shared/host';
import setAuthHeader from '../../components/shared/setAuthHeader';

const AddPersonalDetails = () => {
  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [permanentCountry, setPermanentCountry]=useState({});
  const [permanentDistrict, setPermanentDistrict]=useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const { register, handleSubmit, formState: { errors } } = useForm();
  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'YUw0MzNzbHhOWHZoOElkZzliWFdRNDRXVWswZjdjaTVBVWkxMXg5dA=='
      }
    };
    async function fetchCountry() {
      try {
        const result = await axios(config);
        setCountries(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCountry()
  }, [])
  useEffect(() => {
    const config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${selectedCountry?.iso2}/states`,
      headers: {
        'X-CSCAPI-KEY': 'YUw0MzNzbHhOWHZoOElkZzliWFdRNDRXVWswZjdjaTVBVWkxMXg5dA=='
      }
    };
    async function fetchCity() {
      try {
        const result = await axios(config);
        setDistricts(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCity()
  }, [selectedCountry?.iso2])
  useEffect(() => {
    const config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${permanentCountry?.iso2}/states`,
      headers: {
        'X-CSCAPI-KEY': 'YUw0MzNzbHhOWHZoOElkZzliWFdRNDRXVWswZjdjaTVBVWkxMXg5dA=='
      }
    };
    async function fetchCity() {
      try {
        const result = await axios(config);
        setPermanentDistrict(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCity()
  }, [permanentCountry?.iso2])
  
  const onSubmit = async (data) => {
    setAuthHeader(token)
    try {
      const res = await axios.post(`${host}/api/v1/student/addPersonal`, {...data, presentCountry: selectedCountry.name, permanentCountry: permanentCountry.name});
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
              <select
                defaultValue=''
                className="select select-bordered w-full max-w-xs"
                onChange={e=>setSelectedCountry(JSON.parse(e.target.value))}
                required
              >
                <option value='' disabled>Select Country</option>
                {
                  countries?.map(country => <option key={country?.id} value={JSON.stringify(country)}>{country?.name}</option>)
                }
              </select>
              <select
                defaultValue=''
                {...register("presentDistrict", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value='' disabled>Select District</option>
                {
                  districts.filter(dis=>!dis.name.includes('Division'))?.map(district => <option disabled={district?.name.includes('Division')} key={district?.id} value={district?.name}>{district?.name}</option>)
                }
              </select>
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
                {...register("facebook")}
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
              <select
                defaultValue=''
                className="select select-bordered w-full max-w-xs"
                onChange={e=>setPermanentCountry(JSON.parse(e.target.value))}
                required
              >
                <option value='' disabled>Select Country</option>
                {
                  countries?.map(country => <option key={country?.id} value={JSON.stringify(country)}>{country?.name}</option>)
                }
              </select>
              <select
                defaultValue=''
                {...register("permanentDistrict", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value='' disabled>Select District</option>
                {
                  permanentDistrict.filter(dis=>!dis.name.includes('Division'))?.map(district => <option disabled={district?.name.includes('Division')} key={district?.id} value={district?.name}>{district?.name}</option>)
                }
              </select>
            </div>
            <div className="form-control w-64 max-w-xs">
              <label className="label">
                <span className="label-text">Current Employment Status:</span>
              </label>
              <select
                defaultValue=''
                {...register("employmentStatus", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value='' disabled>Select One</option>
                <option value="employed">Employed</option>
                <option value="unEmployed">Un-Employed</option>
                <option value="business">Business</option>
                <option value="on-board">On Board</option>
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
