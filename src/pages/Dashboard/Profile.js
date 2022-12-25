import React from "react";
import Loading from "../../components/shared/Loading";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useGetUserById from "../../hooks/useGetUserById";
import male from '../../asstes/images/male.png';
import female from '../../asstes/images/female.jpg';
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("authToken");
  const [student, isLoading] = useGetSingleUser(token);
  const [studentDetails, detailsLoading] = useGetUserById(student?.id);
  if (isLoading || detailsLoading) {
    return <Loading />;
  }
  console.log(studentDetails);
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={studentDetails?.personal_info?.photo ? studentDetails?.personal_info?.photo : studentDetails?.gender === 'male'? male : female } alt={student?.name} />
        </div>
      </div>
      <div>
        <h3>Name: {studentDetails?.name}</h3>
        <p>Email: {studentDetails?.email}</p>
        <p>Role: {studentDetails?.role}</p>
        <p>Mobile: {studentDetails?.mobile}</p>
      </div>
      <div className="mt-3">
      {
        studentDetails?.personal_info ? <div>

        </div> : <Link className="link link-hover text-primary" to='/student/details/add'>Add Personal Details</Link>
      }
      </div>
      <div className="mt-3">
      {
        studentDetails?.employment_info ? '' : <Link className="link link-hover text-primary" to='/student/details/add/employment'>Add Employment Details</Link>
      }
      </div>
      <div className="mt-3">
      {
        studentDetails?.academic_info ? '' : <Link className="link link-hover text-primary" to='/student/details/add/academic'>Add Academic Details</Link>
      }
      </div>
      <div className="mt-3">
      {
        studentDetails?.others_info ? '' : <Link className="link link-hover text-primary" to='/student/details/add/others'>Add Others Details</Link>
      }
      </div>
    </div>
  );
};

export default Profile;
