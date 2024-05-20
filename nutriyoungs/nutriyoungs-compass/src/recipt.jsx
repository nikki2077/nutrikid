import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import './App.css';
import './recipt.css';
import './Knowledge.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // ensure this is correct
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import nameicon from './assets/images/fork_knife.png'
import energyicon from './assets/images/energyicon.png'
import proteinicon from './assets/images/proteinicon.png'
import 'react-toastify/dist/ReactToastify.css';


function Recipt({onNavigate}) {
    const [base64, setBase64] = useState("");
    const [nutritionData, setNutritionData] = useState(new Map());
    const [isLoading, setIsLoading] = useState(false);
    const [perishablePrices, setPerishablePrices] = useState("");
    const [nonperishablePrices, setnonPerishablePrices] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [selectedProductInfo, setSelectedProductInfo] = useState({});
    const [perishableProducts, setPerishableProducts] = useState([]);
    

    const parseCSV = (data) => {
        Papa.parse(data, {
            header: true,
            skipEmptyLines: true, // Add this line to skip empty lines
            complete: (results) => {
                const dataMap = new Map();
                results.data.forEach((row) => {
                    if (row.Category) { // Check if the Product property is not undefined
                        dataMap.set(row.Category.toLowerCase(), row);
                    }
                });
                setNutritionData(dataMap);
            },
        });
    };

    useEffect(() => {
        fetch('/Perishable_goods.csv')
            .then((response) => response.text())
            .then((data) => {
                console.log("CSV Data:", data); // Check raw CSV data
                parseCSV(data);
            });
    }, []);

    const handleProductChange = (event) => {
        const productName = event.target.value.toLowerCase().trim();
        console.log("Selected product name:", productName);
        const productInfo = nutritionData.get(productName);
        setSelectedProductInfo(productInfo || {}); // Fallback to an empty object if not found
        console.log("Product info:", productInfo);
    };
    

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
            // Update the state with the API response data
            setPerishableProducts(bodyObj.perishableProducts);

            console.log(bodyObj.perishableProducts.length);
            let newRecommendation = '';
            newRecommendation = 'You have spent $'+ bodyObj.perishable_prices + ' on perishable items and $'+ bodyObj.non_perishable_prices+ ' on non-perishable items. This breakdown helps you understand and manage your spending on different categories of grocery items effectively. Thank you for using SpendSmart to optimize your grocery shopping.'
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
                    <div style={{
                        width: '100%',
                        height: '100%',
                        paddingTop: 200,
                        paddingBottom: 100,
                        paddingLeft: 150,
                        paddingRight: 150,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 135,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            display: 'inline-flex'
                        }}>
                            <div style={{
                                color: '#4CAF50',
                                fontSize: 64,
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                wordWrap: 'break-word'
                            }}>SpendSmart
                            </div>
                            <div style={{
                                color: '#666666',
                                fontSize: 24,
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                                wordWrap: 'break-word'
                            }}>Grocery Analysis Tool
                            </div>
                        </div>
                        <div style={{
                            flex: '1 1 0',
                            color: '#4CAF50',
                            fontSize: 24,
                            fontFamily: 'Manrope',
                            fontWeight: '400',
                            wordWrap: 'break-word'
                        }}>Transform the chore of grocery shopping into a strategic advantage for budgeting and
                            nutritional planning. Analysis of grocery receipts and categorizes purchases, enhance
                            understanding and management of family nutrition and finances in real time.
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        padding: 150,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            alignSelf: 'stretch',
                            color: '#666666',
                            fontSize: 20,
                            fontFamily: 'Manrope',
                            fontWeight: '400',
                            wordWrap: 'break-word'
                        }}>* Currently supports the analysis of digital dockets exclusively from Coles. We are dedicated
                            to enhancing our service and may expand to include more stores in the future.<br/>*
                            Currently accepts only one receipt per analysis session. Future updates will enable the
                            processing of multiple receipts simultaneously to enhance your experience.
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop: '3%'}}>
                    <div className='col-md-6 d-flex'>
                        <div className="col-md-10" style={{
                            border: '2px solid black',
                            borderRadius: '15px',
                            marginLeft: '15%', padding: '20px', backgroundColor: '#fffdf7'
                        }}>
                            <div className='container' style={{border: '2px', borderColor: 'black', height: '50%'}}>
                                <p style={{marginLeft: '20px'}}>Put your photo here</p>
                                <h2 style={{marginLeft: '20px'}}>Receipt Upload</h2>
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
                                        <h3 style={{textAlign: 'center'}}>Analysis</h3>
                                        <p>{recommendation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 d-flex'>
                        <div className="col-md-10" style={{border: '2px solid black', borderRadius:'15px', marginLeft:'7.5%',marginTop:'5%', padding:'20px', backgroundColor:'#fffdf7'}}>
                            <p style={{marginLeft: '20px'}}>Select any good from ypur receipt for Nutrition and Expiration information</p>
                            <h2 style={{marginLeft: '20px'}}>Goods Information</h2>
                            <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                <div className='row'>
                                <select onChange={handleProductChange} style={{ width: '100%', height: '40px', borderRadius: '10px' }}>
                                    {perishableProducts.map((product, index) => (
                                        <option key={index} value={product[0].toLowerCase()}>
                                            {product[0]}
                                        </option>
                                    ))}
                                </select>
                                </div>  
                            </div>
                            <div className='row' style={{marginTop:'36px'}}>
                                <div class='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Protein (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['Protein'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div class='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Carbohydrates (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['Carbohydrate'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Energy (k/cal)</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['Energy'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                            <div className='row' style={{marginTop:'36px'}}>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Fat (g)</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['Fat'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Cholesterol (mg)</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['Cholesterol'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card" style={{backgroundColor:'#faf3e0', borderRadius:'25px'}}>
                                        <h5 style={{marginLeft:'40px', marginTop:'10px'}}>Expiry days</h5>
                                        <span style={{marginLeft:'40px'}}>{selectedProductInfo?.['product_expiry_days'] || "N/A"}</span>  {/* Display detected category */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
                    <div className="col-md-8" style={{marginTop:'5%'}}>
                        <p style={{color:'#4CAF50'}}>After mastering grocery receipt analysis to optimize your budgeting and nutritional planning, you're well on your way to becoming more strategic about your family's dietary and financial health. Harness this powerful tool to keep your nutrition and expenses on track seamlessly.</p>
                    </div>
                    <div className="col-md-2" style={{marginTop:'5%'}}></div>
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

export default Recipt;
