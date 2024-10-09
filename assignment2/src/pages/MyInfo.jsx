import React, { useState } from 'react';
import userIcon from '../AssignImages/user.png';
import './MyInfo.css'; 

const MyInfo = () => {
  return (
    <div className="myInfo">
      <h1>User Information</h1>
      <figure>
        <div>
          <img src={userIcon} width="150" height="150" alt="User" />
        </div>
      </figure>
      <button className="button_type1" type="button" onClick={() => setIsImagePopupOpen(true)}>
        Change Image
      </button>
      <p>Email: Sanghyun.Jun.1@stonybrook.edu</p>
      <p>
        Password: ****** <br/><br/>
        <button className="button_type1" type="button" onClick={() => setIsPwdPopupOpen(true)}>
          Change Password
        </button>
      </p>
      <p>
        Name: Sanghyun Jun <br/><br/>
        <button className="button_type1" type="button" onClick={() => setIsNamePopupOpen(true)}>
          Change Name
        </button>
      </p>

    </div>
  );
};

export default MyInfo;