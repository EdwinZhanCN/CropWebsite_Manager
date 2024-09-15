import React, {useState} from "react";
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


    const renderTabContent = () => {
        switch (activeTab) {
            case 'upload':
                return <ProductUpload />;
            case 'manage':
                return <ProductManage />;
            case 'browse':
                return <ProductBrowser />;
            default:
                return null;
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