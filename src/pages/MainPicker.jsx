import React, { useState } from 'react';
import ProductUpload from "@/services/ProductUpload";
import "@/style/MainPicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import Product from "@/services/Product";
import Logo from "@/services/Logo";


function Tab2() {
    return <div>Tab 2 Content</div>;
}

function Tab3() {
    return <div>Tab 3 Content</div>;
}

function App() {
    // useState 来管理当前显示的 tab
    const [activeTab, setActiveTab] = useState('');

    // 根据当前的 activeTab 渲染不同的组件
    const renderTabContent = () => {
        switch (activeTab) {
            case 'main':
                return <Product />;
            case 'logo':
                return <Logo />;
            case 'tab3':
                return <Tab3 />;
            default:
                return null;
        }
    };

    return (
        <div style={{marginLeft:"200px"}}>
            {/* Tab 按钮 */}
            {activeTab === '' ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h3
                        style={{
                            textAlign: 'center',
                            color: 'var(--grey-500)',
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        Pick the area you want to ediT
                    </h3>
                    <div className="picker-background">
                        <nav className="picker-view">
                            <button className="logo-button" onClick={() => setActiveTab('logo')}>logo</button>
                            <button className="nav-button" onClick={() => setActiveTab('nav')}>navigation</button>
                            <button className="contact-button" onClick={() => setActiveTab('contact')}>contact</button>
                            <button className="main-button" onClick={() => setActiveTab('main')}>main</button>
                            <button className="footer-button" onClick={() => setActiveTab('footer')}>footer</button>
                            <button className="footer-side-button"
                                    onClick={() => setActiveTab('footer-side')}>footer-side
                            </button>
                        </nav>
                    </div>
                </div>

            ) : (
                // 当 activeTab 有值时显示 tab 内容
                <div>
                    {renderTabContent()}
                    <button className="svg-button" onClick={() => setActiveTab('')}>
                        <FontAwesomeIcon style={{fontSize: "26px"}} icon={faXmark} />
                    </button>
                </div>
            )}

        </div>
    );
}

export default App;