import React, { useState } from 'react';
import './add_product.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        cat: "women",
        new_price: "",
        old_price: ""
    });

    // Handle Image Selection
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle Input Changes
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Add Product Function
    const Add_Product = async () => {
        if (!productDetails.name || !productDetails.new_price || !productDetails.old_price) {
            alert("Please fill in all required fields.");
            return;
        }

        if (isNaN(productDetails.new_price) || isNaN(productDetails.old_price)) {
            alert("Prices must be numeric values.");
            return;
        }

        if (!image) {
            alert("Please upload an image.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('product', image);

            // Upload Image
            let uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData
            });

            let responseData = await uploadResponse.json();
            if (!responseData.success || !responseData.image_url) {
                alert("Image upload failed.");
                return;
            }

            // Add Product to Database
            let updatedProduct = { ...productDetails, image: responseData.image_url };

            let addProductResponse = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });

            let result = await addProductResponse.json();
            if (result.success) {
                alert("Product added successfully!");
                setProductDetails({
                    name: "",
                    image: "",
                    cat: "women",
                    new_price: "",
                    old_price: ""
                });
                setImage(null);
            } else {
                alert("Failed to add product.");
            }

        } catch (error) {
            console.error('Error adding product:', error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product Title</p>
                <input type='text' name='name' placeholder='Type here' value={productDetails.name} onChange={changeHandler} />
            </div>

            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input type='text' name='new_price' placeholder='Type here' value={productDetails.new_price} onChange={changeHandler} />
                <p>Offer Price</p>
                <input type='text' name='old_price' placeholder='Type here' value={productDetails.old_price} onChange={changeHandler} />
            </div>

            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select name='cat' value={productDetails.cat} onChange={changeHandler}>
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                </select>
            </div>

            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt='Upload' />
                </label>
                <input type='file' id='file-input' onChange={imageHandler} />
            </div>

            <button onClick={Add_Product} className='addproduct-button'>ADD</button>
        </div>
    );
};

export default AddProduct;
