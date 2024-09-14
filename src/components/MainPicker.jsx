import React, { useState } from 'react';
import FileUpload from "@/services/ProductImageUpload";
import "@/style/MainPicker.css";

// 创建三个简单的组件，表示不同的 tab 内容
function Main() {
    return <FileUpload />;
}

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
                return <Main />;
            case 'tab2':
                return <Tab2 />;
            case 'tab3':
                return <Tab3 />;
            default:
                return null;
        }
    };

    return (
        <div>
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
                    <button
                        className="svg-button"
                        onClick={() => setActiveTab('')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <circle cx="17.5" cy="17.5" r="17" fill="#EAEAEA" stroke="#6D6D6D"/>
                            <path d="M10 26L25 9M25 26L10 9" stroke="#494949" strokeWidth="2"/>
                        </svg>
                    </button>
                </div>
            )}

        </div>
    );
}

export default App;