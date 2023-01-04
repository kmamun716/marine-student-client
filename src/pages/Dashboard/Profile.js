import React, { useState } from "react";
import { Link } from "react-router-dom";
import female from "../../asstes/images/female.jpg";
import male from "../../asstes/images/male.png";
import BasicEdit from "../../components/EditModal/BasicEdit";
import ChangePhoto from "../../components/EditModal/ChangePhoto";
import Loading from "../../components/shared/Loading";
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
  if (isLoading || detailsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img
            src={
              studentDetails?.personal_info?.photo
                ? studentDetails?.personal_info?.photo
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
          Edit photo
        </label>
      </div>
      <div>
        <h3>Name: {studentDetails?.name}</h3>
        <p>Email: {studentDetails?.email}</p>
        <p>Mobile: {studentDetails?.mobile}</p>
        <p>Status: <span className={`${studentDetails?.status === "pending" ? 'text-red-500 text-xl' : 'text-green-500 text-xl'}`}>{studentDetails?.status}</span> <br />{studentDetails?.status === "pending" && <span className="text-2xl text-red-500">Your Profile is Deactive! Please Contact With Admin to Active your Profile</span>}</p>
        <label
          htmlFor="edit-basic-modal"
          className="btn btn-info"
          onClick={() => setModalOpen(true)}
        >
          Edit
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {studentDetails?.personal_info ? (
          <PersonalDetails refetch={refetch} details={studentDetails?.personal_info} />
        ) : (
          <Link
            className="link link-hover text-primary"
            to="/student/details/add"
          >
            Add Personal Details
          </Link>
        )}
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
        {studentDetails?.academic_info ? (
          <AcademicDetails refetch={refetch} details={studentDetails?.academic_info} />
        ) : (
          <Link
            className="link link-hover text-primary"
            to="/student/details/add/academic"
          >
            Add Academic Details
          </Link>
        )}
        {studentDetails?.others_info ? (
          <OthersDetails refetch={refetch} details={studentDetails?.others_info} />
        ) : (
          <Link
            className="link link-hover text-primary"
            to="/student/details/add/others"
          >
            Add Others Details
          </Link>
        )}
      </div>
      {modalOpen && (
        <BasicEdit
          details={studentDetails}
          setModalOpen={setModalOpen}
          refetch={refetch}
        />
      )}
      {photoModal && <ChangePhoto refetch={refetch} details={studentDetails} />}
    </div>
  );
};

export default Profile;
