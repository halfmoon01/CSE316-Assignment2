import React, { useState } from 'react';
import Dialog from './Dialog';

const ChangeImage = ({ isOpen, onClose }) => {
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name);
    }
  };

  return (
    isOpen && (
      <Dialog
        title="Change your image"
        content={
          <>
            <label>New Image</label><br />
            <div className="line2">
              <label htmlFor="fileInput" className="choose-file">Choose File</label>
              <input type="file" id="fileInput" className="file-select" onChange={handleFileChange} />
              <span id="fileName">{selectedFileName}</span>
            </div>
          </>
        }
        onClose={onClose}
        onSave={() => alert('Not currently available')}
      />
    )
  );
};

export default ChangeImage;
