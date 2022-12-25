import React from "react";
import { Link, Outlet } from "react-router-dom";

const AddDetails = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <div className="mb-2">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button btn-sm lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        </div>
        <Outlet />
        
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/student/details/add">Add Personal Info</Link>
          </li>
          <li>
            <Link to="/student/details/add/employment">Add Employment</Link>
          </li>
          <li>
            <Link to="/student/details/add/academic">Add Academic</Link>
          </li>
          <li>
            <Link to="/student/details/add/others">Add Others</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddDetails;
