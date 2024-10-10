import React, { useState } from 'react';
import Dialog from './Dialog';

const ChangeName = ({ isOpen, onClose }) => {
  const [newName, setNewName] = useState('');

  return (
    isOpen && (
      <Dialog
        title="Change your name"
        content={
          <>
            <label htmlFor="newName">New Name</label><br />
            <div className="line2">
            <input
              type="text"
              placeholder="Enter the new name"
              id="newName"
              className="new-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            </div>
          </>
        }
        onClose={onClose}
        onSave={() => alert('Name change is not currently available.')}
      />
    )
  );
};

export default ChangeName;
