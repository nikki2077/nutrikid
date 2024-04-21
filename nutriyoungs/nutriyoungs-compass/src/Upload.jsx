import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import './Upload.css';
import './Knowledge.css';

function Upload() {
    const [base64, setBase64] = useState("");
    const [category, setCategory] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        try {
            const response = await fetch('https://qox72mmfo3.execute-api.us-east-1.amazonaws.com/dev/detect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: base64.split(",")[1] })  // send the base64 encoded part of the image data
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const responseBody = await response.json(); // parsing JSON from the response
            const bodyObj = JSON.parse(responseBody.body); // parsing the 'body' string to JSON
            setCategory(bodyObj.predicted_class);  // setting the category to the predicted class
        } catch (error) {
            console.error('Error posting image:', error);
            setCategory("Failed to detect category");
        }
    };

    return (
        <div className="Upload">
            <main>
                <div>
                    <h2>Media Upload</h2>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <div>
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                    {base64 && <img src={base64} alt="Preview" style={{ width: '30%', marginTop: '20px' }} />}
                </div>
                <div>
                    <h2>Performance Overview</h2>
                    <div className="card">
                        <span>Category Detected</span>
                        <h3>{category || "No Category Detected"}</h3>  {/* Display detected category */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Upload;
