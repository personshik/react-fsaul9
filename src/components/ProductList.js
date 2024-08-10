import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
