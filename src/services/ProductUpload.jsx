import React, { useState } from 'react';
import "@/style/ProductUpload.css";


const ProductUpload = () => {
    const [files, setFiles] = useState([]);
    const [fileType, setFileType] = useState('纸盒'); // 默认类型为纸盒
    const [customFileName, setCustomFileName] = useState(); // 自定义文件名
    const [productPrice, setProductPrice] = useState(); // 产品价格
    const [productQuantity, setProductQuantity] = useState(); // 产品数量
    const [productDescription, setProductDescription] = useState(); // 产品描述
    const [previewUrl, setPreviewUrl] = useState(null); // 预览图片的 URL
    const [fileName, setFileName] = useState(''); // 文件名
    // 处理文件选择
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 处理类型选择
    const handleTypeChange = (event) => {
        setFileType(event.target.value);
    };

    // 处理自定义文件名输入
    const handleFileNameChange = (event) => {
        setCustomFileName(event.target.value);
    };


    // 将文件发送到后端
    const handleUpload = async () => {
        //check the type of the file image, must be jpg or png
        //adding support for avif
        if (![...files].every(file => ['image/jpeg', 'image/png','image/avif'].includes(file.type))) {
            alert('THE FILE TYPE IS NOT SUPPORTED!');
            return;
        }

        if (files.length === 0) {
            alert('Please Select the IMAGE！');
            return;
        }


        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('files', file));
        formData.append('fileType', fileType);
        formData.append('customFileName', customFileName);
        formData.append('productPrice', productPrice);
        formData.append('productQuantity', productQuantity);
        formData.append('productDescription', productDescription);

        try {
            const response = await fetch('http://localhost:3000/api/blob-upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('文件上传成功');
            } else {
                alert('文件上传失败');
            }
        } catch (error) {
            console.error('上传文件时出错:', error);
            alert('上传文件时出错，请检查控制台获取详细信息');
        }
    };

    return (
        <>
            <div id="product-upload">
                <h2>Upload the products</h2>
                <hr className="custom-hr"/>
                <div className="img-upload-style">
                    <form id="form">
                        <label htmlFor="submit">
                            <div id={"choose-button"}>
                                <span>Choose image...</span>
                            </div>
                        </label>
                        <input
                            id={"submit"}
                            style={{display: 'none'}}
                            type="file" onChange={handleFileChange}
                        />
                        <small>choose one product image</small>
                    </form>
                    {previewUrl && (
                        <div>
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '30%', height: 'auto' }} />
                            <br/>
                            <small>{fileName}</small>
                        </div>
                    )}

                    <div id="dropdown-box">
                        <select value={fileType} onChange={handleTypeChange}>
                            <option value="paper">纸盒</option>
                            <option value="plastic">塑料盒</option>
                        </select>
                        <small>Choose the type of your product</small>
                        <small><a>Edit products list</a></small>
                    </div>

                </div>
                <input
                    type="text"
                    placeholder="product name"
                    value={customFileName}
                    onChange={handleFileNameChange}
                    style={{display: 'block', marginTop: '10px'}}
                />
                <input
                    type="number"
                    placeholder="product price"
                    value={productPrice}
                    onChange={(event) => setProductPrice(event.target.value)}
                    style={{display: 'block', marginTop: '10px'}}
                />
                <input
                    type="number"
                    placeholder="product quantity"
                    value={productQuantity}
                    onChange={(event) => setProductQuantity(event.target.value)}
                    style={{display: 'block', marginTop: '10px'}}
                />
                <textarea
                    placeholder="product description"
                    value={productDescription}
                    onChange={(event) => setProductDescription(event.target.value)}
                    style={{display: 'block', marginTop: '10px'}}
                />
                <br/>
                <button onClick={handleUpload} className="upload-button">
                    upload products
                </button>
            </div>
        </>
    );
};

export default ProductUpload;