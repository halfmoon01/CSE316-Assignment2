//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React, { useEffect, useState } from 'react';
import Calendar from '@mui/icons-material/CalendarToday'; 
import People from '@mui/icons-material/People';
import Location from '@mui/icons-material/LocationOn';
import Available from '@mui/icons-material/Accessibility';
import Description from '@mui/icons-material/Description';
import './MyReservation.css';


function MyReservation() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const allReservations = [];
    for (let i = 0; i < localStorage.length; i++) {
      const facilityName = localStorage.key(i);
      const facilityReservations = JSON.parse(localStorage.getItem(facilityName));
      // get item using key and push everyelement to the array
      if (Array.isArray(facilityReservations)) {
        facilityReservations.forEach(reservation => {
          allReservations.push({
            ...reservation,
            facilityName
          });
        });
      }
    }
    setReservations(allReservations);
  }, []);

  const handleCancel = (i) => {
    const updatedReservations = [...reservations];
    const { facilityName } = updatedReservations[i];
    // from reservations, remove ith element
    updatedReservations.splice(i, 1);
    // use setReservations
    setReservations(updatedReservations);
    const FacilityReservations = JSON.parse(localStorage.getItem(facilityName));
    // get element from JSON, and remove ith element. 
    FacilityReservations.splice(i, 1);
    // and them by using setItem, store it
    localStorage.setItem(facilityName, JSON.stringify(FacilityReservations));
  };

  return (
    <div>
      {/*if nothing found -> just print by h2*/}
      {reservations.length === 0 ? (
        <h2>No reservations found.</h2>
      ) : ( 
        <div>
          {reservations.map((reservation, index) => (
            <div className="list-container" key={index}>
              <img 
                src={reservation.image}
                alt={reservation.facilityName} 
                className="list-image" 
              />
              <div className="list-detail">
                <h2>{reservation.facilityName}</h2>
                <p><Description  style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {reservation.purpose}</p>
                <p><Calendar  style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {reservation.date}</p>
                <p><Location  style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {reservation.location}</p>
                <p><People  style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> Sanghyun Jun + {reservation.people - 1}</p>
                <p><Available  style={{ fontSize: 'clamp(12px, 2vw, 18px)' }}/> {reservation.affiliation}</p>
                <button 
                  className="cancel-button" 
                  onClick={() => handleCancel(index)}
                >Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservation;
