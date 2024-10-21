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

    updatedReservations.splice(i, 1);
    setReservations(updatedReservations);
    const FacilityReservations = JSON.parse(localStorage.getItem(facilityName));
    FacilityReservations.splice(i, 1);
    localStorage.setItem(facilityName, JSON.stringify(FacilityReservations));
  };

  return (
    <div>
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
                <p><Description /> {reservation.purpose}</p>
                <p><Calendar /> {reservation.date}</p>
                <p><Location /> {reservation.location}</p>
                <p><People /> Sanghyun Jun + {reservation.people - 1}</p>
                <p><Available /> {reservation.affiliation}</p>
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
