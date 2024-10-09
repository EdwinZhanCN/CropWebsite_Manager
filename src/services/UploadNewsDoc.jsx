import React, {useState}from "react";

function UploadNewsDoc() {
    const [files, setFiles] = useState([]);

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
                        <input type="text"/>
                        <label>-标题</label>
                        <input type="text" placeholder="yyyy-mm-dd"/>
                        <label>-日期</label>
                        <textarea/><label>描述</label>

                    </div>
                    <hr className={"custom-hr"}/>
                    <button className={"upload-button"}>上传</button>
                </div>
            )}
        </div>
    );
}

export default UploadNewsDoc;