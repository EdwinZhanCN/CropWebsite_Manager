const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

// define the azure blob account information using .env file
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = "news-doc";

// get a SAS key from azure and write the file into storage contianer
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

// define container client
const containerClient = blobServiceClient.getContainerClient(containerName);

// define a multer helps to upload images
const newsUploader = multer({ storage: multer.memoryStorage() });


// the main function that access azure api to upload image
const uploadFile = async (containerClient, file, index, custom_name, date) => {
    const newFileName = generateFileName(index, file.originalname, custom_name, date);
    const blockBlobClient = containerClient.getBlockBlobClient(newFileName);
    await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    console.log(`${newFileName} 上传成功`);
    return newFileName;
};

// generate a union file name for all blob-image stored in the azure storage
const generateFileName = (index, originalName, custom_name, date) => {
    const fileExtension = originalName.split('.').pop();
    return `${date}_${custom_name}_${index + 1}.${fileExtension}`;
};

// the function that upload news file to both azure storage and the mysql-database allocated by java web
// the function utilize the uploadFile function
const uploadNews = async (req, res) => {
    const files = req.files;
    const newsName = req.body.customFileName || 'news';
    const newsDate = req.body.newsDate || '0000-00-00';
    const newsDescription = req.body.newsDescription || 'This is a sample description';

    if (!files || files.length === 0) {
        return res.status(400).send('没有文件被上传');
    }

    try {
        let azureMsg = '';
        let databaseMsg = '';

        // 文件上传到 Azure Blob Storage
        const uploadedFileNames = await Promise.all(
            files.map((file, index) => uploadFile(containerClient, file, index, newsName, newsDate))
        );

        azureMsg = '所有文件成功上传至 Azure Blob Storage';

        // 构建新闻数据列表
        const newsList = uploadedFileNames.map((newFileName) => ({
            title: newsName,
            fileUrl: `https://${accountName}.blob.core.windows.net/${containerName}/${newFileName}`,
            date: new Date().toISOString().split('T')[0], // 当前日期（格式为 YYYY-MM-DD）
            shortText: newsDescription
        }));

        const url = 'http://localhost:8080/api/static/news';

        // 发送新闻数据到数据库
        await axios.post(url, newsList.length === 1 ? [newsList[0]] : newsList, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            databaseMsg = '新闻信息成功添加至数据库';
            console.log(response.data);
        }).catch((error) => {
            databaseMsg = '新闻信息添加至数据库失败';
            console.error(error);
        });

        // 发送响应，包括 Azure 和数据库状态消息
        res.status(200).send({
            message: '操作完成',
            azureMsg: azureMsg,
            databaseMsg: databaseMsg,
            fileNames: uploadedFileNames
        });
    } catch (error) {
        console.error('上传文件时出错:', error);
        res.status(500).send({
            message: '文件上传失败',
            error: error.message
        });
    }

};

module.exports = { newsUploader, uploadNews };