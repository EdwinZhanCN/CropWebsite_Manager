import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [fileType, setFileType] = useState('纸盒'); // 默认类型为纸盒
    const [customFileName, setCustomFileName] = useState('product'); // 自定义文件名

    // 处理文件选择
    const handleFileChange = (event) => {
        setFiles(event.target.files);
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
        if (files.length === 0) {
            alert('请选择文件！');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('files', file));
        formData.append('fileType', fileType);
        formData.append('customFileName', customFileName);

        try {
            const response = await fetch('http://localhost:3000/upload', {
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
        <div style={{padding: '20px', maxWidth: '600px', margin: 'auto'}}>
            <input type="file" multiple onChange={handleFileChange}/>
            <select value={fileType} onChange={handleTypeChange}>
                <option value="纸盒">纸盒</option>
                <option value="塑料盒">塑料盒</option>
            </select>
            <input
                type="text"
                placeholder="自定义文件名"
                value={customFileName}
                onChange={handleFileNameChange}
                style={{display: 'block', marginTop: '10px'}}
            />
            <button onClick={handleUpload} style={{marginTop: '10px'}}>
                上传文件
            </button>
        </div>
    );
};

export default FileUpload;