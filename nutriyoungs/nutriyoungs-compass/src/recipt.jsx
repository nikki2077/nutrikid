import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import './recipt.css';
import './Knowledge.css';
import 'bootstrap/dist/css/bootstrap.css';
import Papa from 'papaparse';
import nameicon from './assets/images/fork_knife.png'
import energyicon from './assets/images/energyicon.png'
import proteinicon from './assets/images/proteinicon.png'

function Recipt({onNavigate}) {
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
          // Set initial loading messages
          const chartImageElement = document.getElementById('chartImage');
          chartImageElement.alt = 'Waiting for scanning...';  // Set an alternative text during loading
          chartImageElement.src = '';  // Clear any existing image
      
          const productListElement = document.getElementById('perishableProductsList');
          productListElement.innerHTML = '<li style="text-align: center; margin-top: 20px;">Waiting for scanning...</li>';
      
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
          
          // Display the chart image
          const base64Image = bodyObj.chartImage;
          if(base64Image) {
            chartImageElement.src = `data:image/png;base64,${base64Image}`;
            chartImageElement.alt = ''; // Clear the alternative text once the image is loaded
          }
      
          // Display perishable products
          const perishableProducts = bodyObj.perishableProducts;
          productListElement.innerHTML = ''; // Clear the waiting message
          perishableProducts.forEach(product => {
            const productItem = document.createElement('li');
            productItem.textContent = `${product[1]} - ${product[0]}`;
            productItem.style.margin = '10px 0';
            productListElement.appendChild(productItem);
          });
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
            <main style={{backgroundColor: '#faf3e0'}}>
                <div className='row'>
                    <div className="col-md-5" style={{marginTop:'5%'}}>
                        <h1 style={{marginLeft: '30%', color:'#4CAF50'}}>Recipt Scanner</h1>
                    </div>
                    <div className="col-md-6" style={{marginTop:'5%'}}>
                        <p style={{color:'#4CAF50'}}>Rapid identification of food items from uploaded images to assist in nutritional management. Upload a photo of a food item. and the system will analyze the image to recognize the type of food presented Provides detailed nutritional information, including calorie count. portion size, and nutrient breakdown, such as fats, proteins, and carbohydrates. Help parents make informed decisions about the foods their children consume, aligning with dietary needs and restrictions.</p>
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
                            <p style={{marginLeft: '20px'}}>Bar Chart</p>
                            <h2 style={{marginLeft: '20px'}}>Perishable vs Non-Perishable Product Prices</h2>
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
                        </div>
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
                <div style={{position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <button className="btn-secondary mb-2" onClick={() => onNavigate('landing')}>Back to Home</button>
                    <button className="btn btn-primary" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>To the Top</button>
                </div>
            </main>
        </div>
    );
}

export default Recipt;
