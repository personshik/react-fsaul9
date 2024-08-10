import React, { useState } from 'react';
import './AddProduct.css';

const ProductForm = ({ type, formData, onInputChange }) => {
  switch (type) {
    case 'DVD':
      return (
        <div className="form-group">
          <label htmlFor="size">Size (MB)</label>
          <input
            type="text"
            id="size"
            name="size"
            className="input"
            value={formData.size}
            onChange={onInputChange}
            placeholder="Enter Size"
          />
        </div>
      );
    case 'Furniture':
      return (
        <>
          <div className="form-group">
            <label htmlFor="height">Height (CM)</label>
            <input
              type="text"
              id="height"
              name="height"
              className="input"
              value={formData.height}
              onChange={onInputChange}
              placeholder="Enter Height"
            />
          </div>
          <div className="form-group">
            <label htmlFor="width">Width (CM)</label>
            <input
              type="text"
              id="width"
              name="width"
              className="input"
              value={formData.width}
              onChange={onInputChange}
              placeholder="Enter Width"
            />
          </div>
          <div className="form-group">
            <label htmlFor="length">Length (CM)</label>
            <input
              type="text"
              id="length"
              name="length"
              className="input"
              value={formData.length}
              onChange={onInputChange}
              placeholder="Enter Length"
            />
          </div>
        </>
      );
    case 'Book':
      return (
        <div className="form-group">
          <label htmlFor="weight">Weight (KG)</label>
          <input
            type="text"
            id="weight"
            name="weight"
            className="input"
            value={formData.weight}
            onChange={onInputChange}
            placeholder="Enter Weight"
          />
        </div>
      );
    default:
      return null;
  }
};

const AddProduct = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [formData, setFormData] = useState({
    size: '',
    height: '',
    width: '',
    length: '',
    weight: '',
    description: '',
  });

  const handleTypeChange = (event) => {
    setProductType(event.target.value);
    setFormData({
      size: '',
      height: '',
      width: '',
      length: '',
      weight: '',
      description: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const product = {
      sku,
      name,
      price,
      type: productType,
      description: formData.description,
      ...(productType === 'DVD' && { size: formData.size }),
      ...(productType === 'Furniture' && {
        height: formData.height,
        width: formData.width,
        length: formData.length,
      }),
      ...(productType === 'Book' && { weight: formData.weight }),
    };

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          setSku('');
          setName('');
          setPrice('');
          setProductType('');
          setFormData({
            size: '',
            height: '',
            width: '',
            length: '',
            weight: '',
            description: '',
          });
          alert('Product added successfully!');
        } else {
          alert('Error adding product');
        }
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleCancel = () => {
    setSku('');
    setName('');
    setPrice('');
    setProductType('');
    setFormData({
      size: '',
      height: '',
      width: '',
      length: '',
      weight: '',
      description: '',
    });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSave} className="form-content">
        <h1 className="title">Product ADD</h1>
        <div className="form-group">
          <div className="button-group">
            <button type="submit" className="action-button">
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="action-button"
            >
              Cancel
            </button>
          </div>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            className="input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Enter SKU"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="select"
            value={productType}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            <option value="DVD">DVD</option>
            <option value="Furniture">Furniture</option>
            <option value="Book">Book</option>
          </select>
        </div>
        <ProductForm
          type={productType}
          formData={formData}
          onInputChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default AddProduct;
