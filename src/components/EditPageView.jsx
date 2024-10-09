import React, {useEffect, useState} from "react";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/style/EditPageView.css";
import { AllComponents } from "@/data/components-data.js";
import { links } from "@/data/data";

function EditComponent({ component, close }) {
    const [componentProps, setComponentProps] = useState({});
    const [originalProps, setOriginalProps] = useState({});

    useEffect(() => {
        if (component.props) {
            setComponentProps(component.props);
            setOriginalProps(component.props);
        } else {
            alert("该组件没有配置");
        }
    }, []);

    const handleSave = () => {
        // Implement save logic here
        alert("保存成功！");
        setOriginalProps(componentProps);
    };

    const handleLeave = () => {
        if (window.confirm("确定要离开吗？所有未保存的数据将会丢失")) {
            setComponentProps(originalProps);
            close();
        }
    };

    return (
        <div>
            <h3>自定义名称: {component.custom_name}</h3>
            <h3>组件原型: {component.name}</h3>
            {componentProps && Object.keys(componentProps).map((prop) => (
                <div key={prop}>
                    <input type="text" value={componentProps[prop] || ''}
                           onChange={(e) => setComponentProps({ ...componentProps, [prop]: e.target.value })} />
                    <label>{prop}</label>
                </div>
            ))}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: "1rem",
                    gap: "1rem"
                }}
            >
                <button className={"upload-button"} onClick={handleSave}>保存</button>
                <button className={"upload-button"} onClick={handleLeave}>离开</button>
            </div>
        </div>
    );
}


function AddComponent({ close }) {
    const [componentType, setComponentType] = useState('ImgBox');
    const [componentName, setComponentName] = useState('名称');
    const [componentProps, setComponentProps] = useState({});

    function getComponentDefinition(componentType) {
        const targetComponent = AllComponents.find((component) => component.name === componentType);
        if (targetComponent.props) {
            setComponentProps(targetComponent.props);
        } else {
            setComponentProps({});
            alert("该组件没有配置, 请更换");
        }
    }

    function checkComponentProps() {
        if (Object.keys(componentProps).length === 0) {
            alert("请先加载配置");
            return false;
        }
        for (const prop in componentProps) {
            if (componentProps[prop] === null || componentProps[prop] === "") {
                alert("请填写完整配置");
                return false;
            }
        }
        return true;
    }

    function closeAddNew() {
        if (window.confirm("确定要离开吗？所有数据将会丢失")) {
            setComponentType('ImgBox');
            setComponentName('名称');
            setComponentProps({});
            close();
        }
    }

    return (
        <div className={"add-new-box-wrapper"}>
            <h3>添加一个新的组件</h3>
            <hr className={"custom-hr"} />
            <div>
                <select value={componentType} onChange={(e) => setComponentType(e.target.value)}>
                    {AllComponents.map((component) => (
                        <option key={component.name} value={component.name}>{component.name}</option>
                    ))}
                </select>
                <label>选择组件类型</label>
            </div>
            <div>
                <input type="text" value={componentName} onChange={(e) => setComponentName(e.target.value)} />
                <label>如：“公司介绍链接”</label>
            </div>
            <div>
                <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    icon={faRotateRight}
                    onClick={() => getComponentDefinition(componentType)}
                />
            </div>

            <hr className={"custom-hr"} />
            {componentProps && Object.keys(componentProps).map((prop) => (
                <div key={prop}>
                    <input type="text" value={componentProps[prop]}
                           onChange={(e) => setComponentProps({ ...componentProps, [prop]: e.target.value })} />
                    <label>{prop}</label>
                </div>
            ))}
            <hr className={"custom-hr"} />
            <button
                style={{ marginBottom: "1rem" }}
                className="upload-button"
                onClick={() => checkComponentProps()}
            >
                添加
            </button>
            <button
                style={{ marginBottom: "1rem" }}
                className="upload-button"
                onClick={() => closeAddNew()}
            >
                离开
            </button>
        </div>
    );
}

function EditPageView({ link }) {
    const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
    const [editingComponentId, setEditingComponentId] = useState(null);

    return (
        <div>
            <h2>Edit Page View - {link.text}</h2>
            <hr className={"custom-hr"} />
            {
                links.find((l) => l.text === link.text).components
                &&
                links.find((l) => l.text === link.text).components.map((component) => (
                <div key={component.id}>
                    {editingComponentId === component.id ?
                        <EditComponent
                            component={component}
                            close={() => setEditingComponentId(null)}
                        />
                        :
                        <div
                            className={"edit-component-button"}
                            onClick={() => setEditingComponentId(component.id)}
                        >
                            <h3>{component.name}</h3>
                        </div>
                    }
                </div>
            ))}
            {isAddComponentOpen ?
                <AddComponent close={() => setIsAddComponentOpen(false)} />
                :
                <div className={"add-new-button"} onClick={() => setIsAddComponentOpen(!isAddComponentOpen)}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            }
        </div>
    );
}

export default EditPageView;