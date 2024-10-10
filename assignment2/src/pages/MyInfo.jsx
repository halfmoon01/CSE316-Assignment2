import React, { useState } from 'react';
import userIcon from '../AssignImages/user.png';
import './MyInfo.css'; 

import ChangePwd from '../dialog/ChangePwd'
import ChangeImage from '../dialog/ChangeImage'
import ChangeName from '../dialog/ChangeName'

const MyInfo = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isPwdOpen, setIsPwdOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  return (
    <div className="myInfo">
      <h1>User Information</h1>
      <figure>
        <div>
          <img src={userIcon} width="150" height="150" alt="User" />
        </div>
      </figure>
      <button className="button_type1" type="button" onClick={() => setIsImageOpen(true)}>
        Change Image
      </button>
      <p>Email: Sanghyun.Jun.1@stonybrook.edu</p>
      <p>
        Password: ****** <br/><br/>
        <button className="button_type1" type="button" onClick={() => setIsPwdOpen(true)}>
          Change Password
        </button>
      </p>
      <p>
        Name: Sanghyun Jun <br/><br/>
        <button className="button_type1" type="button" onClick={() => setIsNameOpen(true)}>
          Change Name
        </button>
      </p>

      <ChangeImage isOpen={isImageOpen} onClose=
        {() => setIsImageOpen(false)} />
      <ChangePwd isOpen={isPwdOpen} onClose=
        {() => setIsPwdOpen(false)} />
      <ChangeName isOpen={isNameOpen} onClose=
        {() => setIsNameOpen(false)} />
        
    </div>
  );
};
export default MyInfo;