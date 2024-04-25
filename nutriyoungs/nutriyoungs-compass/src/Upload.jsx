import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import './Upload.css';
import './Knowledge.css';
import 'bootstrap/dist/css/bootstrap.css';
import Papa from 'papaparse';

function Upload() {
    const [base64, setBase64] = useState("");
    const [category, setCategory] = useState("");
    const [nutritionData, setNutritionData] = useState(new Map());
    const [categoryData, setCategoryData] = useState({}); // <-- Declare categoryData state here


    const parseCSV = (data) => {
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true, // Add this line to skip empty lines
            complete: (results) => {
                const dataMap = new Map();
                results.data.forEach((row) => {
                    if (row.Product) { // Check if the Product property is not undefined
                        dataMap.set(row.Product.toLowerCase(), row);
                    }
                });
                setNutritionData(dataMap);
            },
        });
    };

    useEffect(() => {
        fetch('/Nutrient_Info.csv')
            .then((response) => response.text())
            .then((data) => {
                console.log("CSV Data:", data); // Check raw CSV data
                parseCSV(data);
            });
    }, []);

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
                body: JSON.stringify({ body: base64.split(",")[1] })
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const responseBody = await response.json();
            const bodyObj = JSON.parse(responseBody.body);
            setCategory(bodyObj.predicted_class.toLowerCase().trim());

            console.log('Nutrition data map:', nutritionData);

            // Update the nutritional information state
            const detectedCategoryData = nutritionData.get(bodyObj.predicted_class.toLowerCase().trim());
            setCategoryData(detectedCategoryData); // Store the nutritional data in the state
        } catch (error) {
            console.error('Error posting image:', error);
            setCategory("Failed to detect category");
        }
    };

    return (
        <div className="Upload">
            <main>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Image Upload</h2>
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} style={{ height: '60vh', alignItems: 'center', marginTop: 'auto' }} />
                            <p style={{ alignItems: 'center', marginTop: 'auto' }}>Drag 'n' drop the image here</p>
                        </div>
                        <div>
                            <button onClick={handleUpload} style={{ textAlign: 'center' }}>Upload</button>
                        </div>
                        {base64 && <img src={base64} alt="Preview" style={{ width: '30%', marginTop: '100px' }} />}
                    </div>
                    <div className="col-md-6">
                        <h2>Performance Overview</h2>
                        <div className="card" style={{ alignContent: 'center' }}>
                            <h3>Product Detected</h3>
                            <span>{category || "No Category Detected"}</span>  {/* Display detected category */}
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Energy (K/cal)</h3>
                                    <span>{categoryData?.['Energy (K/cal)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Protein (g)</h3>
                                    <span>{categoryData?.['Protein (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className="card">
                                    <h3>Fat (g)</h3>
                                    <span>{categoryData?.['Fat (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div className="card">
                                    <h3>Carbohydrates (g)</h3>
                                    <span>{categoryData?.['Carbohydrates (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Total Sugars (g)</h3>
                                    <span>{categoryData?.['Total Sugars (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Cholesterol (mg)</h3>
                                    <span>{categoryData?.['Cholesterol (mg)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Fiber (g)</h3>
                                    <span>{categoryData?.['Fiber (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="card">
                                    <h3>Portion (g)</h3>
                                    <span>{categoryData?.['Portion (g)'] || "N/A"}</span>  {/* Display detected category */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Upload;
