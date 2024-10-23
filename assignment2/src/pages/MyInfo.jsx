//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React, { useState } from 'react';
import userIcon from '../AssignImages/user.png';
import './MyInfo.css'; 

import ChangePwd from '../dialog/ChangePwd'
import ChangeImage from '../dialog/ChangeImage'
import ChangeName from '../dialog/ChangeName'

const MyInfo = () => {
  //control 3 cases of dialog
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
      {/* when click -> setIsImage = true  */}
      <button className="button_type1" type="button" onClick={() => setIsImageOpen(true)}>
        Change Image
      </button>
      <p>Email: Sanghyun.Jun.1@stonybrook.edu</p>
      <p>
        Password: ****** <br/><br/>
        {/* when click -> setIsPwd = true  */}
        <button className="button_type1" type="button" onClick={() => setIsPwdOpen(true)}>
          Change Password
        </button>
      </p>
      <p>
        Name: Sanghyun Jun <br/><br/>
        {/* when click -> setIsName = true  */}
        <button className="button_type1" type="button" onClick={() => setIsNameOpen(true)}>
          Change Name
        </button>
      </p>
      {/* by using onClose, make setIs~~ to false to make them closed*/}
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