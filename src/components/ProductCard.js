import React, { useState, useEffect } from 'react';
import './productcard.css';

const ProductCard = ({ productId, onDelete }) => {
  const [product, setProduct] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://yourserver.com/api/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCheckboxChange = async () => {
    setChecked(!checked);
    if (!checked) {
      try {
        await fetch(`http://yourserver.com/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (onDelete) {
          onDelete(productId);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-card">
      <div className="delete-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          aria-label="Delete product"
        />
      </div>
      <h3>{product.name}</h3>
      <p>
        <strong>SKU:</strong> {product.sku}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Type:</strong> {product.type}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      {product.type === 'DVD' && (
        <p>
          <strong>Size:</strong> {product.size} MB
        </p>
      )}
      {product.type === 'Furniture' && (
        <>
          <p>
            <strong>Height:</strong> {product.height} cm
          </p>
          <p>
            <strong>Width:</strong> {product.width} cm
          </p>
          <p>
            <strong>Length:</strong> {product.length} cm
          </p>
        </>
      )}
      {product.type === 'Book' && (
        <p>
          <strong>Weight:</strong> {product.weight} kg
        </p>
      )}
    </div>
  );
};

export default ProductCard;
