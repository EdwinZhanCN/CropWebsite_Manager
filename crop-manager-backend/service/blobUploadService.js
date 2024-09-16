const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

// define the azure blob account information using .env file
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

// get a SAS key from azure and write the file into storage contianer
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

// define container client
const containerClient = blobServiceClient.getContainerClient(containerName);

// define a multer helps to upload images
const upload = multer({ storage: multer.memoryStorage() });


// the main function that access azure api to upload image
const uploadFile = async (containerClient, file, index, type, custom_name) => {
    const newFileName = generateFileName(index, file.originalname, type, custom_name);
    const blockBlobClient = containerClient.getBlockBlobClient(newFileName);
    await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    console.log(`${newFileName} 上传成功`);
    return newFileName;
};

// generate a union file name for all blob-image stored in the azure storage
const generateFileName = (index, originalName, type, custom_name) => {
    const now = new Date();
    const year = now.getFullYear() % 100;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const fileExtension = originalName.split('.').pop();
    return `${year}${month}${day}_${type}_${custom_name}_${index + 1}.${fileExtension}`;
};

// the function that upload image file to both azure storage and the mysql-database allocated by java web
// the function utilize the uploadFile function
const uploadFiles = async (req, res) => {
    const files = req.files;
    const fileType = req.body.fileType || '纸盒';
    const productName = req.body.customFileName || 'product';
    const productPrice = req.body.productPrice || 0;
    const productQuantity = req.body.productQuantity || 0;
    const productDescription = req.body.productDescription || '';

    if (!files || files.length === 0) {
        return res.status(400).send('没有文件被上传');
    }

    try {
        const uploadedFileNames = await Promise.all(
            files.map((file, index) => uploadFile(containerClient, file, index, fileType, productName))
        );

        res.status(200).send({
            message: '所有文件上传成功',
            fileNames: uploadedFileNames
        });

        const url = 'http://localhost:8080/api/static/products';
        await Promise.all(
            uploadedFileNames.map((newFileName, index) => {
                return axios.post(url, {
                    upload_date: new Date().toISOString(),
                    file_name: newFileName,
                    product_name: productName,
                    price: productPrice,
                    quantity: productQuantity,
                    description: productDescription,
                    url: `https://${accountName}.blob.core.windows.net/${containerName}/${newFileName}`,
                }).then((response) => {
                    console.log(`产品 ${productName} 信息添加成功`);
                    console.log(response.data);
                }).catch((error) => {
                    console.error(`产品 ${productName} 信息添加失败:`, error);
                });
            })
        );
    } catch (error) {
        console.error('上传文件时出错:', error);
        res.status(500).send('文件上传失败');
    }
};

module.exports = { upload, uploadFiles };