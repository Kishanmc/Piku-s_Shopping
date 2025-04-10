
import React from 'react';
import './App.css';
import Navbar from './component/Navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Cart from './pages/cart';
import Shop from './pages/shop';
import Login from './pages/login';
import Shopcat from './pages/shopcat';
import Product from './pages/product';
import Footer from './component/footer/footer';
import men_banner from '../src/component/Assets/banner_mens.png'
import women_banner from '../src/component/Assets/banner_women.png'
import kids from '../src/component/Assets/banner_kids.png'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
      
       <Route path='/' element={<Shop />} />
       
        <Route path='/men' element={<Shopcat banner={men_banner} category='men'/>} />
        <Route path='/women' element={<Shopcat banner={women_banner} category='women'/>} />
        <Route path='/children' element={<Shopcat banner={kids} category='kid'/>} />
        
        <Route path='/product' element={<Product />} >
            <Route path=':productid' element={<Product />} />
          </Route>

        <Route path='/login' element={<Login  />} />
        <Route path='/cart' element={<Cart />} />   
        
           </Routes>
          
      <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
