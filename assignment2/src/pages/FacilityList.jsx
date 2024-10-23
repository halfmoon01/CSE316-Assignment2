//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu


import React from "react";
import "./FacilityList.css"; 
import facilities from '../Facility_Data.js';
import Calendar from '@mui/icons-material/CalendarToday'; 
import People from '@mui/icons-material/People';
import Location from '@mui/icons-material/LocationOn';
import Available from '@mui/icons-material/Accessibility';


const FacilityReservation = () => {

  return (
    <div className="facility-list">
      {facilities.map((facility, index) => (
        <div key={index} className="facility-container">
          {facility.isODD ? (
            //make a blank block if it's an odd placeholder
            <div className="blank-block"></div>
          ) : (
            // else, just print them out
            <>
              <img
                src={facility.image}
                alt={facility.name}
                className="facility-image"
              />
              <div className="facility-details">
                <h2>{facility.name}</h2>
                <p>{facility.description}</p>
                <p><Calendar /> {facility.days}</p>
                <p><People /> {facility.participants}</p>
                <p><Location /> {facility.location}</p>
                <p><Available /> {facility.availableTo}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FacilityReservation;
