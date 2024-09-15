import React, {useState} from "react";

function Logo() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // 预览图片的 URL
    const [fileName, setFileName] = useState(''); // 文件名
    // TODO: get the current logo url from the server
    const [currenLogoUrl, setCurrentLogoUrl] = useState('http://localhost:3000/logo');
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFile(selectedFiles);

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

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file!');
            return;
        }

        const formData = new FormData();
        formData.append('logo', file);

        try {
            // TODO: upload the logo to the server
            const response = await fetch('http://localhost:3000/upload-logo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Logo uploaded successfully');
            } else {
                alert('Failed to upload logo');
            }
        } catch (error) {
            console.error('Error uploading logo:', error);
            alert('Error uploading logo, please check the console for more details');
        }
    };

    return (
        <div className="img-upload-style">
            <h2>Upload Logo</h2>
            <hr className={"custom-hr"}/>
            <div>
                <h3>Current logo</h3>
                <img src={currenLogoUrl} alt="Logo" style={{maxWidth: '30%', height: 'auto'}}/>
                <br/>
            </div>
            <div>
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
                        <img src={previewUrl} alt="Preview" style={{maxWidth: '30%', height: 'auto'}}/>
                        <br/>
                        <small>{fileName}</small>
                    </div>
                )}
            </div>
            <button className={"upload-button"} onClick={handleUpload}>Upload</button>
        </div>

    );
}

export default Logo;