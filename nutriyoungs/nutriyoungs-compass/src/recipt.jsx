import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import './App.css';
import './recipt.css';
import './Knowledge.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // ensure this is correct
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Recipt({onNavigate}) {
    const [base64, setBase64] = useState("");
    const [category, setCategory] = useState("");
    const [nutritionData, setNutritionData] = useState(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState("");


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
            const chartImageElement = document.getElementById('chartImage');
            const productListElement = document.getElementById('perishableProductsList');
            
            const response = await fetch('https://mdcnjc8b89.execute-api.us-east-1.amazonaws.com/dev/processReceipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: base64.split(",")[1] })
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const responseBody = await response.json();
            const bodyObj = JSON.parse(responseBody.body);
            
            chartImageElement.src = `data:image/png;base64,${bodyObj.chartImage}`;
            chartImageElement.alt = ''; // Clear alternative text when image is loaded
    
            productListElement.innerHTML = ''; // Clear the message
            bodyObj.perishableProducts.forEach(product => {
                const productItem = document.createElement('li');
                productItem.textContent = `${product[1]} - ${product[0]}`;
                productListElement.appendChild(productItem);
            });
            console.log(bodyObj.perishableProducts.length);
            let newRecommendation = '';
            if (bodyObj.perishableProducts.length < 3) {
                newRecommendation = "You should purchase more perishable products.";
            } else if (bodyObj.perishableProducts.length > 12) {
                newRecommendation = "There are enough perishable products purchased.";
            } else {
                newRecommendation = "no recommendation.";}
            setRecommendation(newRecommendation); // This will trigger a re-render
            toast.success('Image processed successfully!');
        } catch (error) {
            console.error('Error posting image:', error);
            chartImageElement.alt = 'Failed to load image. Please try again.';
            productListElement.innerHTML = '<li style="text-align: center; margin-top: 20px;">Failed to retrieve data. Please try again.</li>';
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
        <div className="Recipt">
            <ToastContainer />
            <main style={{backgroundColor: '#faf3e0'}}>
                <div className='row'>
                    <div className="col-md-5" style={{marginTop:'5%'}}>
                        <h1 style={{marginLeft: '30%', color:'#4CAF50'}}>SpendSmart:
Grocery Analysis Tool</h1>
                    </div>
                    <div className="col-md-6" style={{marginTop:'5%'}}>
                        <p style={{color:'#4CAF50'}}>Transform the chore of grocery shopping into a strategic advantage for budgeting and nutritional planning. Using Optical Character Recognition, with an automated analysis of grocery receipts and categorizes purchases, focusing on key areas like expenditure on fruits and vegetables and providing detailed nutritional breakdowns for each item. Enhance understanding and management of family nutrition and finances in real time.</p>
                    </div>
                </div>
                <div className="row" style={{marginTop:'3%'}}>
                    <div className='col-md-6 d-flex'>
                        <div className="col-md-10"  style={{border: '2px solid black', borderRadius:'15px', marginLeft:'15%', padding:'20px',  backgroundColor:'#fffdf7'}}>
                            <div className='container' style={{border:'2px', borderColor:'black', height:'50%'}}>
                                <p style={{marginLeft: '20px'}}>Put your photo here</p>
                                <h2 style={{marginLeft: '20px'}}>Recipt Upload</h2>
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
                            <p style={{marginLeft: '20px'}}>Analysing Cost of Perishable & Non-Perishable</p>
                            <h2 style={{marginLeft: '20px'}}>Product Prices</h2>
                            <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                <div className='row'>
                                    <img id="chartImage" style={{width:'100%', height:'100%'}}></img>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '36px'}}>
                                <div className="col-md-12">
                                    <div className="card" style={{backgroundColor: '#faf3e0', borderRadius: '25px', padding: '20px'}}>
                                        <h3 style={{textAlign: 'center'}}>Perishable Products</h3>
                                        <ul id="perishableProductsList" style={{listStyleType: 'none', paddingLeft: '0'}}>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '36px'}}>
                                <div className="col-md-12">
                                    <div className="card" style={{backgroundColor: '#faf3e0', borderRadius: '25px', padding: '20px'}}>
                                        <h3 style={{textAlign: 'center'}}>Recommondations</h3>
                                        <p>{recommendation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                    <div className="col-md-8" style={{marginTop:'5%'}}>
                        <h1 style={{color:'black'}}>Limitations</h1>
                        <p style={{color:'black'}}>* We regret any possible inaccuracies in receipt recognition and are actively working to expand support for receipts from different supermarkets. Thank you for your understanding.</p>
                        <p style={{color:'black'}}>* The nutrient values presented are average estimates and can vary due to differences in cooking techniques and the inclusion of various ingredients to achieve different flavors. Additionally, these values may vary across different brands.</p>
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

export default Recipt;
