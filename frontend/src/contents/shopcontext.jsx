import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const Shopcontext = createContext(null);
export const useShopContext = () => useContext(Shopcontext);

const getDefaultCart = (products) => {
    let cart = {};
    products.forEach((product) => {
        cart[product.id] = 0;
    });
    return cart;
};

const Shopcontextprovider = ({ children }) => {
    const [allProduct, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const token = localStorage.getItem("auth-token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all products
                const productRes = await fetch("http://localhost:4000/allproduct");
                const productsData = await productRes.json();
                setAllProduct(productsData);

                if (token) {
                    // Fetch cart for logged-in user
                    const cartRes = await fetch("http://localhost:4000/getcart", {
                        method: "POST",
                        headers: {
                            "auth-token": token,
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({})
                    });
                    const cartData = await cartRes.json();
                    setCartItems(cartData);
                } else {
                    setCartItems(getDefaultCart(productsData));
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [token]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (!token) return;

        try {
            await fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ itemId })
            });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (!token) return;

        try {
            await fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ itemId })
            });
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const totalValue = useMemo(() => {
        return allProduct.reduce((total, product) => {
            return total + (cartItems[product.id] || 0) * product.new_price;
        }, 0);
    }, [cartItems, allProduct]);

    const getTotalItems = useMemo(() => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    }, [cartItems]);

    const contextValue = {
        all_product: allProduct,
        cartItems,
        addToCart,
        removeFromCart,
        totalValue,
        getTotalItems
    };

    return (
        <Shopcontext.Provider value={contextValue}>
            {children}
        </Shopcontext.Provider>
    );
};

export default Shopcontextprovider;
