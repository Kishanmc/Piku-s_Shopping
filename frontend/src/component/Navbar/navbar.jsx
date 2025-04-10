import React, { useContext, useRef, useState } from 'react';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../../contents/shopcontext';
import nav_downbar from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const { getTotalItems } = useContext(Shopcontext);
  const menuref = useRef();
  const authToken = localStorage.getItem('auth-token');

  const dropdown_togle = (e) => {
    menuref.current.classList.toggle('nav-menu-vissible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace('/'); // Redirect after logout
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo not found" />
        <p className='logoname'><b>PIKU's Shopping</b></p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_togle} src={nav_downbar} alt="" />
      <div ref={menuref} className="nav-main">
        <li onClick={() => { setmenu("shop") }}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">Shop</Link>{menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setmenu("men") }}>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/men'}>Men</Link>{menu === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setmenu("women") }}>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/women'}>Women</Link>{menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setmenu("children") }}>
          <Link style={{ textDecoration: "none", color: "black" }} to={'/children'}>Kids</Link>{menu === "children" ? <hr /> : <></>}
        </li>
      </div>

      <div className="nav-login">
        {authToken ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button><Link style={{ textDecoration: "none", color: "black" }} to={'/login'}>Login</Link></button>
        )}
        <Link style={{ textDecoration: "none", color: "black" }} to={'/cart'}>
          <img src={cart} alt='error' />
        </Link>
        <div className="nav-cart-count">{getTotalItems}</div>
      </div>
    </div>
  );
};

export default Navbar;
