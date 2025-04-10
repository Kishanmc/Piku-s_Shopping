import React, { useState } from "react";

import "./CSS/cart.css";
import { useShopContext } from "../contents/shopcontext";


const Cart = () => {
    const { cartItems, all_product, removeFromCart, addToCart, totalValue, getTotalItems } = useShopContext();
    const [promoCode, setPromoCode] = useState("");

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {getTotalItems === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {all_product.map((product) => {
                                if (cartItems[product.id] > 0) {
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <img src={product.image} alt={product.name} className="cart-product-img" />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>${product.new_price}</td>
                                            <td>{cartItems[product.id]}</td>
                                            <td>${cartItems[product.id] * product.new_price}</td>
                                            <td>
                                                <button className="cart-btn" onClick={() => addToCart(product.id)}>+</button>
                                                <button className="cart-btn remove" onClick={() => removeFromCart(product.id)}>-</button>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>

                    <div className="cart-totals">
                        <h2>Cart Totals</h2>
                        <div className="totals-details">
                            <p>Subtotal: <span>${totalValue.toFixed(2)}</span></p>
                            <p>Shipping Fee: <span>Free</span></p>
                            <p>Total: <span>${totalValue.toFixed(2)}</span></p>
                        </div>
                        <div className="promo-code">
                            <p>If you have a promo code, enter it here</p>
                            <input
                                type="text"
                                placeholder="Promo code..."
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button className="submit-btn">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
