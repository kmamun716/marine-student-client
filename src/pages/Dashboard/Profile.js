import axios from 'axios';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import female from "../../asstes/images/female.jpg";
import male from "../../asstes/images/male.png";
import BasicEdit from "../../components/EditModal/BasicEdit";
import ChangePhoto from "../../components/EditModal/ChangePhoto";
import { host } from '../../components/shared/host';
import Loading from "../../components/shared/Loading";
import setAuthHeader from '../../components/shared/setAuthHeader';
import AcademicDetails from "../../components/StudentDetails/AcademicDetails";
import EmploymentDetails from "../../components/StudentDetails/EmploymentDetails";
import OthersDetails from "../../components/StudentDetails/OthersDetails";
import PersonalDetails from "../../components/StudentDetails/PersonalDetails";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useGetUserById from "../../hooks/useGetUserById";

const Profile = () => {
  const token = localStorage.getItem("authToken");
  const [modalOpen, setModalOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [student, isLoading] = useGetSingleUser(token);
  const [studentDetails, detailsLoading, refetch] = useGetUserById(student?.id);
  const handleChange=async(data)=>{
    setAuthHeader(token)
    const result = await axios.put(`${host}/api/v1/student/editBasic`, data);
    if(result?.status === 201){
      refetch()
    }
  }
  if (isLoading || detailsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img
            src={
              studentDetails?.photo
                ? studentDetails?.photo
                : studentDetails?.gender === "male"
                  ? male
                  : female
            }
            alt={student?.name}
          />
        </div>
        <label
          htmlFor="edit-photo-modal"
          className="btn btn-info btn-xs"
          onClick={() => setPhotoModal(true)}
        >
          Change photo
        </label>
      </div>
      <div className="mb-2">
        <h3>Name: {studentDetails?.name}</h3>
        <p>Email: {studentDetails?.email} <span className={`px-2 rounded text-xs ${studentDetails?.shareContact === "yes" ? 'bg-green-500' : "bg-red-500"}`}>{studentDetails?.shareContact === "yes" ? "Shared" : "Hide"}</span></p>
        <p>Mobile: {studentDetails?.mobile} <span className={`px-2 rounded text-xs ${studentDetails?.shareContact === "yes" ? 'bg-green-500' : "bg-red-500"}`}>{studentDetails?.shareContact === "yes" ? "Shared" : "Hide"}</span></p>
        <p>Status: <span className={`${studentDetails?.status === "pending" ? 'text-red-500 text-xl' : 'text-green-500 text-xl'}`}>{studentDetails?.status}</span> <br />{studentDetails?.status === "pending" && <span className="text-2xl text-red-500">Your Profile is Deactive! We Will Approve You Shortly......</span>}</p>
        <label
          htmlFor="edit-basic-modal"
          className="btn btn-info"
          onClick={() => setModalOpen(true)}
        >
          Edit
        </label>
        <span className="mx-2">{studentDetails?.shareContact === "yes" ? <button onClick={()=>handleChange({shareContact : "no"})} className="btn btn-primary btn-md">Hide Contact</button> : <button onClick={()=>handleChange({shareContact : "yes"})} className="btn btn-accent btn-md">Share Contact</button>}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          {studentDetails?.employment_info ? (
            <EmploymentDetails refetch={refetch} details={studentDetails?.employment_info} />
          ) : (
            <Link
              className="link link-hover text-primary"
              to="/student/details/add/employment"
            >
              Add Employment Details
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {studentDetails?.academicStatus ? (
            <AcademicDetails refetch={refetch} details={studentDetails} />
          ) : (
            <Link
              className="link link-hover text-primary"
              to="/student/details/add/academic"
            >
              Add Academic Details
            </Link>
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-around gap-2">
          <div>
            {studentDetails?.personal_info ? (
              <PersonalDetails refetch={refetch} details={studentDetails?.personal_info} />
            ) : (
              <Link
                className="btn btn-accent"
                to="/student/details/add"
              >
                Add Personal Details
              </Link>
            )}
          </div>
          <div>
            {studentDetails?.others_info ? (
              <OthersDetails refetch={refetch} details={studentDetails?.others_info} />
            ) : (
              <Link
                className="btn btn-info"
                to="/student/details/add/others"
              >
                Add Emergency Contact Details
              </Link>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <BasicEdit
          details={studentDetails}
          setModalOpen={setModalOpen}
          refetch={refetch}
        />
      )}
      {photoModal && <ChangePhoto setPhotoModal={setPhotoModal} refetch={refetch} details={studentDetails} />}
    </div>
  );
};

export default Profile;
