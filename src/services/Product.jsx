import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";
import {faListCheck} from "@fortawesome/free-solid-svg-icons/faListCheck";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import ProductManage from "@/services/ProductManage";
import ProductBrowser from "@/services/ProductBroswer";
import ProductUpload from "@/services/ProductUpload";
import "@/style/Product.css";

function Product(){
    const [activeTab, setActiveTab] = useState('upload');
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/api/get-products', {
                    method: 'GET',
                });

                if (response.ok) {
                    const res = await response.json();
                    setProducts(res.data);
                    console.log(res.data);
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                    setProducts([]);  // Set products to an empty array on error
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);  // Set products to an empty array on error
            }
        }

        fetchProducts().then(() => console.log('Products fetched'));
    }, []);  // Empty dependency array to run useEffect only once


    // Render the content of the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'upload':
                return <ProductUpload />;
            case 'manage':
                return <ProductManage />;
            case 'browse':
                return <ProductBrowser products={products}/>;
            default:
                return <ProductUpload />;
        }
    };
    return(

        <div>
            {renderTabContent()}
            <div className="pop-up-toolbar slide-left">
                <nav>
                    <button className={`${activeTab === "upload" ? 'active' : ''}`}
                            onClick={() => setActiveTab('upload')}>upload <FontAwesomeIcon icon={faUpload}/></button>
                    <button className={`${activeTab === "manage" ? 'active' : ''}`}
                            onClick={() => setActiveTab('manage')}>manage <FontAwesomeIcon icon={faListCheck}/></button>
                    <button className={`${activeTab === "browse" ? 'active' : ''}`}
                            onClick={() => setActiveTab('browse')}>browse <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default Product;