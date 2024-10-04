import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "@/style/ProductBroswer.css";

function ProductBrowser({products}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    // if products is not null or empty, set filteredProducts to products
    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

    return (
        <div>
            <h2>Browse Products</h2>
            <hr className="custom-hr"/>
            <input
                style={{width:"50%", backgroundColor:"var(--grey-100)"}}
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {filteredProducts.length === 0 || false ? <small>Loading...</small> : filteredProducts.map((product) => (
                    <ProductCard key={product.file_name} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ProductBrowser;