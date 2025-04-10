import React, { useEffect, useState } from "react";
import "./listproduct.css";
import axios from "axios";

const ListProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4000/allproduct");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // const removeProduct = async (id) => {
    //     try {
    //         await fetch(`http://localhost:4000/deleteproduct/${id}`, { method: "DELETE" });
    //         setProducts(products.filter((product) => product.id !== id));
    //     } catch (error) {
    //         console.error("Error deleting product:", error);
    //     }
    // };

    const handleDelete = (productId) => {
      axios
        .post("http://localhost:4000/removeproduct", { id: productId })
        .then((res) => {
          if (res.data.success) {
            setProducts(products.filter((product) => product.id !== productId));
          }
        })
        .catch((err) => console.error("Error deleting product:", err));
    };

    return (
        <div className="product-list-container">
            <h2>All Products List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Title</th>
                        <th>Old Price</th>
                        <th>New Price</th>
                        <th>Category</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td><img src={product.image} alt={product.name} className="product-img" /></td>
                                <td>{product.name}</td>
                                <td>${product.old_price}</td>
                                <td>${product.new_price}</td>
                                <td>{product.cat}</td>
                               <td> <button className="delete-btn" onClick={() => handleDelete(product.id)}>❌</button></td>                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-products">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListProduct;
