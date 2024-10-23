//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <ul>
      <li>
        <h1>Facility Reservation</h1>
      </li>
      <ul>
        <li>Facility List
          <ol>
            <li>Reservation Date should be the date after today</li>
            <li>The number of users should be between the maximum number of people and the minimum number of people.</li>
            <li>If the facility is available only for SUNY Korea, user should be in SUNY Korea</li>
            <li>The reservation date must be made on the available day of the week</li>
            <li>The same person cannot book another facility on the same date.</li>
            <p>If all conditions are met, data is stored in local storage.</p>
          </ol>
        </li>
      </ul>

      <ul>
        <li><h2>User Information</h2>
          <ol>
            <li>user profile, user email, user password, user name</li>
            <li>All other details can be modified except for the user email.</li>
            <li>If the user profile is changed, the image in the navbar will also change.</li>
          </ol>
        </li>
      </ul>

      <ul>
        <li><h2>Reservation History</h2>
          <p>Load the reservation data stored in the local storage.</p>
          <p>reservation id, facility name, purpose, peopleNum, isSUNY, booker name, date</p>
          <p>Can cancel reservation</p>
        </li>
      </ul>
    </ul>
  );
};

export default Home;
