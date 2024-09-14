import React, { useState } from 'react';

// 创建三个简单的组件，表示不同的 tab 内容
function Tab1() {
    return <div>Tab 1 Content</div>;
}

function Tab2() {
    return <div>Tab 2 Content</div>;
}

function Tab3() {
    return <div>Tab 3 Content</div>;
}

function App() {
    // useState 来管理当前显示的 tab
    const [activeTab, setActiveTab] = useState('tab1');

    // 根据当前的 activeTab 渲染不同的组件
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tab1':
                return <Tab1 />;
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
            <nav>
                <button onClick={() => setActiveTab('tab1')}>Tab 1</button>
                <button onClick={() => setActiveTab('tab2')}>Tab 2</button>
                <button onClick={() => setActiveTab('tab3')}>Tab 3</button>
            </nav>

            {/* 渲染当前 tab 的内容 */}
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
}

export default App;