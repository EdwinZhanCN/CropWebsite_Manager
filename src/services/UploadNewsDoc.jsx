import React, {useState}from "react";

function UploadNewsDoc() {
    const [files, setFiles] = useState([]);
    //custom file name is the title of the news
    const [customFileName, setCustomFileName] = useState("");
    const [newsDescription, setNewsDescription] = useState("");
    const [newsDate, setNewsDate] = useState("");

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        //check if the file is a markdown file
        if (!droppedFiles.every(file => file.type === 'text/markdown')) {
            alert('请上传Markdown文件！');
        } else if (droppedFiles.length > 1) {
            alert('只能上传一个文件！');
        } else {
            alert('选择成功！');
            setFiles(droppedFiles);
        }
    };

    const handleClickSelectFile = (files) => {
        // Check if the file is a markdown file
        if (!Array.from(files).every(file => file.type === 'text/markdown')) {
            alert('请上传Markdown文件！');
        } else if (files.length > 1) {
            alert('只能上传一个文件！');
        } else {
            alert('选择成功！');
            setFiles(Array.from(files));
        }
    };

    const handleUpload = async () => {
        //check the type of the file image, must be jpg or png
        //adding support for avif
        if (![...files].every(file => ['text/markdown'].includes(file.type))) {
            alert('THE FILE TYPE IS NOT SUPPORTED!');
            return;
        }

        if (files.length === 0) {
            alert('Please Select the IMAGE！');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('files', file));
        formData.append('customFileName', customFileName);
        formData.append('newsDescription', newsDescription);
        formData.append('newsDate', newsDate);

        //check if all the fields are filled
        if (!customFileName || !newsDate) {
            alert('请填写所有字段！');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/news-upload', {
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

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <h2>Upload News Document</h2>
            <hr className={"custom-hr"}/>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'center'
                }}
            >
                <p>拖拽文件到此处，或者点击 *选择文件</p>
                {/*Only allow markdown file*/}
                <input
                    type="file"
                    accept=".md"
                    onChange={(e) => handleClickSelectFile(e.target.files)}
                    style={{display: 'none'}}
                    id="fileInput"
                />
                <label htmlFor="fileInput"
                       style={{
                           cursor: 'pointer',
                           padding: "5px",
                           borderRadius:"8px",
                       backgroundColor: "var(--grey-300)"
                    }}
                >
                    选择文件
                </label>
            </div>
            <hr className={"custom-hr"}/>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            {files.length > 0 && (
                <div>
                    <div>
                        <input
                            type="text"
                            value={customFileName}
                            onChange={(e) => setCustomFileName(e.target.value)}
                        />
                        <label>-标题</label>
                        <input
                            type="text"
                            placeholder="yyyy-mm-dd"
                            value={newsDate}
                            onChange={(e) => setNewsDate(e.target.value)}
                        />
                        <label>-日期</label>
                        <textarea
                            value={newsDescription}
                            onChange={(e) => setNewsDescription(e.target.value)}
                        />
                        <label>描述</label>
                    </div>
                    <hr className={"custom-hr"}/>
                    <button
                        className={"upload-button"}
                        onClick={handleUpload}
                    >
                        上传
                    </button>
                </div>
            )}
        </div>
    );
}

export default UploadNewsDoc;