import React from 'react';
import Slidebar from '../../component/slidebar/slidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../component/add_product/add_product';
import Listproduct from '../../component/listproduct/listproduct';

const Admin = () => {
  return (
    <div className="admin">
      <Slidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<Listproduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
