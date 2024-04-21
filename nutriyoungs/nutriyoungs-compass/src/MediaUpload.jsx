import React from 'react';
import { useDropzone } from 'react-dropzone';

function MediaUpload() {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div>
      <h2>Media Upload</h2>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {/* URL upload input and button */}
      <div>
        <button>Upload</button>
      </div>
    </div>
  );
}

export default MediaUpload;
