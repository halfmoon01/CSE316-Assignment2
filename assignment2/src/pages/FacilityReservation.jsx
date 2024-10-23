//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React, { useState } from "react";
import facilities from '../Facility_Data.js';
import Calendar from '@mui/icons-material/CalendarToday'; 
import People from '@mui/icons-material/People';
import Location from '@mui/icons-material/LocationOn';
import Available from '@mui/icons-material/Accessibility';
import "./FacilityReservation.css"

function FacilityReservation() {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]); 
  const [formData, setFormData] = useState({
    date: '',
    people: '',
    affiliation: 'SUNY Korea',
    purpose: ''
  });

  const FacilitySelect = (event) => {
    const selectedName = event.target.value;
    const facility = facilities.find(
        f => (f.name === selectedName)
    );
    setSelectedFacility(facility);
  };

  const handleFormChange = (f) => {
    const {name,value} = f.target;
    setFormData(
      {...formData, [name]: value }
      );
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const errors = [];
    const today = new Date();
    const [minCapacity, maxCapacity] = selectedFacility.participants.split('-').map(str => parseInt(str.trim()));
    // Form entered info
    const f_date = formData.date;
    const f_affiliation = formData.affiliation;
    const f_people = parseInt(formData.people);
    const f_purpose = formData.purpose;

    // Case0: Don't accpet null
    if (!f_date || !f_people || !f_purpose) {
       alert("0: Cannot reserve: Some parts are missing");
       return;
    }
    // Case1: Check if the selected date is in the past
    if (new Date(f_date) < today) {
      errors.push("1: Cannot reserve: Selected date is in the past");
    }
    // Case2: Check if the number of people is within the allowed range
    if (f_people < minCapacity || f_people > maxCapacity) {
      errors.push(`2: Cannot reserve: available number of members: ${minCapacity} ~ ${maxCapacity}`);
    }
    // Case3: Check if the facility is restricted to SUNY Korea members only
    if (selectedFacility.availableTo === "Only for SUNY Korea" && f_affiliation !== "SUNY Korea") {
      errors.push("3: Cannot reserve: SUNY Korea members only");
    }
    
    const ReservationList = JSON.parse(localStorage.getItem(selectedFacility.name)) || [];
    // Case 4: Check if there is already a reservation for the same facility
    const facilityConflict = ReservationList.find(
      reservation => reservation.facility === selectedFacility.name
    );
    if (facilityConflict) {
      errors.push("4: Cannot reserve: Facility is already in reservation");
    }
    
    // Case 5: Check if there is a reservation on the same date
    let date_error = false;
    let facilityReservations;
    if (localStorage.length == 0){
      facilityReservations = [];
    }else{
      for (let i = 0; i < localStorage.length; i++) {
        const name_key = localStorage.key(i);
        const facilityReservations = JSON.parse(localStorage.getItem(name_key));
        if (facilityReservations.find(reservation => reservation.date === f_date)) {
          date_error = true;
          break;
          }
        }
    }
    if (date_error) {
      errors.push("5: Cannot reserve: Another facility is reserved on the same date");
    }

    // Case6:  Check if it satisfies the reservation date
    const [year, month, day] = formData.date.split('-');
    const DayOfWeek = computeDayOfWeek(year, month, day);
    const availableDayList = selectedFacility.days.split(',').map(day => day.trim());
    if (!availableDayList.includes(DayOfWeek)) {
      errors.push(`6: Cannot reserve: The facility is not available on ${DayOfWeek}.`);
    }

    // if errors happened, join every alert 
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }else{
      alert("Reservation Success");
    }


    const reservationData = {
      ...formData,
      facility: selectedFacility.name, 
      image: selectedFacility.image,
      location: selectedFacility.location,
      date: f_date,
      people: f_people,
      affiliation: f_affiliation,
      purpose: f_purpose
    };
  
    // push them
    ReservationList.push(reservationData);
    // using setItem, store in localStorage
    localStorage.setItem(selectedFacility.name, JSON.stringify(ReservationList));

    // Reset the form data after submission
    setFormData({
      date: '',
      people: '',
      affiliation: 'SUNY Korea',
      purpose: ''
    });
  };
  
  

  return (
    /*selection*/
    <div className="reservation-container">
        <select onChange={FacilitySelect} className="select">
        {facilities.map((facility, index) => (
          <option key={index} value={facility.name}>
            {facility.name}
          </option>
        ))}
        </select>

      {/* selected image & detail */}
        <div className="selected-container">
            <img 
                src={selectedFacility.image} 
                alt={selectedFacility.name} 
                className="selected-image" 
            />
            <div className="selected-details">
                <h2>{selectedFacility.name}</h2>
                <p>{selectedFacility.description}</p>
                <p><Calendar style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {selectedFacility.days}</p>
                <p><People style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {selectedFacility.participants}</p>
                <p><Location style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {selectedFacility.location}</p>
                <p><Available style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {selectedFacility.availableTo}</p>
            </div>
        </div>

      {/* Reservation form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date to be Used:</label><br />
          <input 
            type="date" 
            className="text" 
            name="date" 
            value={formData.date} 
            onChange={handleFormChange} 
          />
        </div>
        <div>
          <label>Number of People:</label><br />
          <input 
            type="number" 
            className="text" 
            name="people" 
            value={formData.people} 
            onChange={handleFormChange} 
          />
        </div>
        <div className="radio">
          <input 
            type="radio" 
            name="affiliation" 
            value="SUNY Korea" 
            checked={formData.affiliation === 'SUNY Korea'} 
            onChange={handleFormChange} 
          /> SUNY Korea
          <input 
            type="radio" 
            name="affiliation" 
            value= "Non-SUNY Korea"
            checked={formData.affiliation === 'Non-SUNY Korea'} 
            onChange={handleFormChange} 
          /> Non-SUNY Korea
        </div>
        <div>
          <label>Purpose of Use:</label><br />
          <textarea 
            rows="4" 
            className="textarea" 
            name="purpose" 
            value={formData.purpose} 
            onChange={handleFormChange} 
          />
        </div>
        <button type="submit" className="reservation-submit">Submit</button>
      </form>
    </div>
  );
}

function computeDayOfWeek(year, month, day) {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  
  let q = parseInt(day);
  let m = parseInt(month);
  let y = parseInt(year);
  if (m === 1 || m === 2) {
    m += 12;
    y -= 1;
  }
  let k = y % 100;  
  let j = Math.floor(y / 100);  
  let h = (q + Math.floor(13 *(m+1)/5)+k+Math.floor(k/4)+Math.floor(j/4)-2*j) % 7;
  if (h < 0) {
    h += 7;
  }
  return days[h]; 
}


export default FacilityReservation;