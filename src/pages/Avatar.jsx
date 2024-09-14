import React, { useState, useEffect } from "react";
import "@/style/Avatar.css";

function Avatar({ accountData }) {
    const [formData, setFormData] = useState({
        username: accountData.username || '',
        email: accountData.email || '',
        phone: accountData.phone || '',
        role: accountData.role || '',
    });

    const [errors, setErrors] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [isPopupShown, setIsPopupShown] = useState(false);

    // 处理输入框的更改
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newData = {
                ...prevFormData,
                [name]: value,
            };
            // 检查数据是否发生变化
            const dataChanged = Object.keys(newData).some(
                (key) => newData[key] !== accountData[key]
            );
            setIsChanged(dataChanged);
            if(dataChanged) {
                setIsPopupShown(true);
            }
            return newData;
        });

        // 校验用户名,邮箱和电话号码
        if (name === 'username' && !/^[a-zA-Z0-9_]+$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Username can only include letters, numbers, and underscores.',
            }));
        } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email must be a valid email address.',
            }));
        } else if (name === 'phone' && !/^\d{11}$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: 'Phone number must be 11 digits.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }
    };

    // 保存数据并同步到后端
    const handleSave = () => {
        // 确保没有错误后发送数据
        // if (Object.values(errors).every((err) => !err)) {
        //     fetch('/api/saveProfile', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log('Success:', data);
        //             setIsChanged(false);
        //             setIsPopupShown(false);
        //         })
        //         .catch((error) => {
        //             console.error('Error:', error);
        //         });
        // }
        // 确保没有错误后发送数据
        if (Object.values(errors).every((err) => !err)) {
            // 模拟发送数据的延迟
            setIsChanged(false);
            setTimeout(() => {
                setIsPopupShown(false);
            }, 300);
        } else {
            window.alert('Please correct the errors before saving.');
        }
    };

    return (
        <div>
            <div className="title-view">
                <h2>Profile</h2>
            </div>

            <hr className="custom-hr"/>
            <div className="edge-view">
                <h3>Username:</h3>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                {errors.username ?
                    <small className="error" style={{color: "red"}}>{errors.username}</small>
                    :
                    <small style={{color: "green", fontSize: "15px"}}>&#x2714;</small>
                }
                <br/>
                <small>The username can only be changed within 30 days</small>
                <br/>

                <h3>Email:</h3>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email ?
                    <small className="error" style={{color:"red"}}>{errors.email}</small>
                    :
                    <small style={{color:"green", fontSize:"15px"}}>&#x2714;</small>
                }
                <br />

                <h3>Phone:</h3>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                {errors.phone ?
                    <small className="error" style={{color:"red"}}>{errors.phone}</small>
                    :
                    <small style={{color:"green", fontSize:"15px"}}>&#x2714;</small>
                }
                <br />

                <h3>Role:</h3>
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    disabled
                />

                {isPopupShown && (
                    <div className={`pop-up-reminder ${isChanged ? 'slide-up' : 'slide-down'}`}>
                        <p>You have unsaved changes.</p>
                        <button onClick={handleSave} className="save-button">
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Avatar;
