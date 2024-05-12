import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import './Upload.css';
import './Knowledge.css';
import 'bootstrap/dist/css/bootstrap.css';
import Papa from 'papaparse';
import nameicon from './assets/images/fork_knife.png'
import energyicon from './assets/images/energyicon.png'
import proteinicon from './assets/images/proteinicon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload({onNavigate}) {
    const [base64, setBase64] = useState("");
    const [category, setCategory] = useState("");
    const [nutritionData, setNutritionData] = useState(new Map());
    const [categoryData, setCategoryData] = useState({}); // <-- Declare categoryData state here
    const [isLoading, setIsLoading] = useState(false);


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
        if (!base64) {
            alert('Please select a file before upload.');
            return;
        }
        toast.info('Uploading image...');
        setIsLoading(true);
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
            toast.success('Image processed successfully!');
        } catch (error) {
            console.error('Error posting image:', error);
            setCategory("Failed to detect category");
        }
    };

    const [imageUrl, setImageUrl] = useState('');

    const handleUrlUpload = async () => {
        try {
            // Fetch the image from the URL
            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) throw new Error('Failed to fetch image.');
    
            // Convert the image to Blob
            const imageBlob = await imageResponse.blob();
    
            // Create a FileReader to convert Blob into Base64
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
                const base64data = reader.result;
    
                // Now use this base64data to perform the upload
                handleUpload(base64data);
            };
        } catch (error) {
            console.error('Error fetching and converting image:', error);
        }
    };

    return (
        <div className="Upload">
            <ToastContainer />
            <main style={{backgroundColor: '#faf3e0'}}>
                <div className='row'>
                    <div className="col-md-5" style={{marginTop:'5%'}}>
                        <h1 style={{marginLeft: '30%', color:'#4CAF50'}}>Food Recognition</h1>
                    </div>
                    <div className="col-md-6" style={{marginTop:'5%'}}>
                        <p style={{color:'#4CAF50'}}>Quickly identify food items from uploaded images to aid in nutritional management. Upload a photo of a food item, and the system will analyze the image to recognize the type of food presented. Provides detailed nutritional information, including calorie count, portion size, and nutrient breakdown, such as fats, proteins, and carbohydrates. Assist parents in making informed decisions about their children's food consumption by aligning with dietary needs and restrictions.</p>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                    <div className="col-md-8" style={{marginTop:'5%'}}>
                        <h1 style={{color:'black'}}>Limitations</h1>
                        <p style={{color:'black'}}>The nutrient values presented are average estimates and can vary due to differences in cooking techniques and the inclusion of various ingredients to achieve different flavors. Additionally, these values may vary across different brands.</p>
                        <p style={{color:'black'}}>The current capabilities of our model allow for the identification of nine specific types of food: donuts. chicken curry, French fries, ice cream. pizza. waffies. garlic bread, burgers, and onion rings. We regret any inaccuracies in food recognition that may occur and are actively working to expand the range of foods our model can accurately identify. Thank you for your understanding.</p>
                        <p style={{color:'black'}}>Due to the performance of the model, the current model accuracy is only 70%. We apologize for the images that may not be correctly recognized.We are working on improving the model accuracy. Thanks for your understanding.</p>
                    </div>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                </div>
                <div className="row" style={{marginTop:'3%'}}>
                    <div className='col-md-6 d-flex'>
                        <div className="col-md-10"  style={{border: '2px solid black', borderRadius:'15px', marginLeft:'15%', padding:'20px',  backgroundColor:'#fffdf7'}}>
                            <div className='container' style={{border:'2px', borderColor:'black', height:'50%'}}>
                                <p style={{marginLeft: '20px'}}>Put your photo here</p>
                                <h2 style={{marginLeft: '20px'}}>Photo Upload</h2>
                                <div {...getRootProps()} className="dropzone" style={{textAlign:'center', backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                    <input {...getInputProps()} style={{ height: '20vh', alignItems: 'center', marginTop: 'auto' }} />
                                    {base64 && <img src={base64} alt="Preview" style={{ width: '200px', height: '100%', objectFit: 'contain', position: 'relative', top: 0, left: 0 }} />}
                                    <p style={{ alignItems: 'center', marginTop: 'auto' }}>Drag 'n' drop the image here</p>
                                </div>
                                <div style={{textAlign:'center'}}>
                                    <button className='btn btn-primary' onClick={handleUpload} style={{ textAlign: 'center' }}>Upload</button>
                                </div>
                                <div className='row' style={{marginTop:'10%'}}>
                                    <div className='col-md-5'>
                                        <hr></hr>
                                    </div>
                                    <div className='col-md-2' style={{textAlign:'center'}}>
                                        <h5>OR</h5>
                                    </div>
                                    <div className='col-md-5'>
                                        <hr></hr>
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-4" style={{marginTop:'10%'}}>
                                    <h5 style={{marginLeft: '20px'}}>Upload From URL</h5>
                                    <div className="row" style={{backgroundColor:'#faf3e0', padding:'20px', borderRadius:'20px', border:'2px solid black'}}>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" placeholder="Enter image URL here" 
                                                value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-primary" onClick={handleUrlUpload}>Upload by URL</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>  
                    <div className='col-md-6 d-flex'>
                        <div className="col-md-10" style={{border: '2px solid black', borderRadius:'15px', marginRight:'15%', padding:'20px', backgroundColor:'#fffdf7'}}>
                            <p style={{marginLeft: '20px'}}>Nutrition / Types / Allergies</p>
                            <h2 style={{marginLeft: '20px'}}>Performance Overview</h2>
                            <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <img src={nameicon} style={{marginLeft:'40px', marginTop:'40px'}}></img>
                                        <h3 style={{marginLeft:'40px', color:'#4CAF50'}}>Name</h3>
                                    </div>
                                    <div className='col-md-8' style={{textAlign:'center', marginTop:'45px'}}>
                                        <span style={{fontSize:'36px', marginTop:'40px', fontWeight:'bold', color:'#4CAF50'}}>{category || "No Category Detected"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                            <div className='row' style={{marginTop:'36px'}}>
                                <div className='col-md-6'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <img src={energyicon} style={{width:'30px', marginTop:'40px', marginLeft:'40px'}}></img>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Energy (K/cal)</h5>
                                        <span style={{fontSize:'40px', marginTop:'20px', fontWeight:'bold', marginLeft:'40px'}}>{categoryData?.['Energy (K/cal)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <img src={proteinicon} style={{width:'30px', marginTop:'40px', marginLeft:'40px'}}></img>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Protein (g)</h5>
                                        <span style={{fontSize:'40px', marginTop:'20px', fontWeight:'bold', marginLeft:'40px'}}>{categoryData?.['Protein (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                            <div className='row' style={{marginTop:'36px'}}>
                                <div className='col-lg-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Fat (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Fat (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div class='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Carbohydrates (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Carbohydrates (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Total Sugars (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Total Sugars (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                            <div className='row' style={{marginTop:'36px'}}>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Cholesterol (mg)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Cholesterol (mg)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Fiber (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Fiber (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Portion (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{categoryData?.['Portion (g)'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                    <div className="col-md-8" style={{marginTop:'5%'}}>
                    </div>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                </div>
                <div className="bmi-buttons">
                <button className="btn-secondary mb-2" onClick={() => {
                    onNavigate('landing');
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 0);  
                }}>Back to Home</button>
                <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
            </div>
            </main>
        </div>
    );
}

export default Upload;
