import React, { useState } from "react";
import {Outlet } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import AddPersonalDetails from "./AddPersonalDetails";
import AddEmploymentDetails from "./AddEmploymentDetails";
import AddAcademicDetails from "./AddAcademicDetails";
import AddOtherDetails from "./AddOtherDetails";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const AddDetails = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div>
      <Outlet />
      <div className="tabs">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Add Personal Details
          </AccordionHeader>
          <AccordionBody>
            <AddPersonalDetails/>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Add Employment Details
          </AccordionHeader>
          <AccordionBody>
            <AddEmploymentDetails />
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Add Academic Details
          </AccordionHeader>
          <AccordionBody>
            <AddAcademicDetails/>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            Add Others Details
          </AccordionHeader>
          <AccordionBody>
            <AddOtherDetails/>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default AddDetails;
