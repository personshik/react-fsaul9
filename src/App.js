import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
