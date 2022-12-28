import React from "react";
import { Link } from "react-router-dom";
import female from '../../asstes/images/female.jpg';
import male from '../../asstes/images/male.png';
import Loading from "../../components/shared/Loading";
import AcademicDetails from "../../components/StudentDetails/AcademicDetails";
import EmploymentDetails from "../../components/StudentDetails/EmploymentDetails";
import OthersDetails from "../../components/StudentDetails/OthersDetails";
import PersonalDetails from "../../components/StudentDetails/PersonalDetails";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useGetUserById from "../../hooks/useGetUserById";

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
          <img src={studentDetails?.personal_info?.photo ? studentDetails?.personal_info?.photo : studentDetails?.gender === 'male' ? male : female} alt={student?.name} />
        </div>
      </div>
      <div>
        <h3>Name: {studentDetails?.name}</h3>
        <p>Email: {studentDetails?.email}</p>
        <p>Role: {studentDetails?.role}</p>
        <p>Mobile: {studentDetails?.mobile}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {
          studentDetails?.personal_info ? <PersonalDetails details={studentDetails?.personal_info} /> : <Link className="link link-hover text-primary" to='/student/details/add'>Add Personal Details</Link>
        }
        {
          studentDetails?.employment_info ? <EmploymentDetails details={studentDetails?.employment_info} /> : <Link className="link link-hover text-primary" to='/student/details/add/employment'>Add Employment Details</Link>
        }
        {
          studentDetails?.academic_info ? <AcademicDetails details={studentDetails?.academic_info} /> : <Link className="link link-hover text-primary" to='/student/details/add/academic'>Add Academic Details</Link>
        }
        {
          studentDetails?.others_info ? <OthersDetails details={studentDetails?.others_info} /> : <Link className="link link-hover text-primary" to='/student/details/add/others'>Add Others Details</Link>
        }
      </div>
    </div>
  );
};

export default Profile;
