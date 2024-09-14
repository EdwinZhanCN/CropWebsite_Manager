// server.js
const express = require('express');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = 3000;

// CORS 配置，允许前端访问
app.use(cors());

// 读取环境变量
// Azure 存储帐户名、密钥和容器名
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

// 设置 Blob Service 客户端
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);
const containerClient = blobServiceClient.getContainerClient(containerName);

// 使用 multer 中间件处理文件上传
const upload = multer({ storage: multer.memoryStorage() });


// 上传文件路由并添加到数据库
app.post('/upload', upload.array('files'), async (req, res) => {
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
        // 上传文件并获取新文件名
        const uploadedFileNames = await Promise.all(
            files.map((file, index) => uploadFile(containerClient, file, index, fileType, productName))
        );

        // 返回上传成功的文件名
        res.status(200).send({
            message: '所有文件上传成功',
            fileNames: uploadedFileNames
        });

        // 将产品信息依次发送到 Java Web 服务
        const url = 'http://localhost:8080/api/static/products';
        await Promise.all(
            // 依次发送每个产品信息
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

});

// 上传单个文件
const uploadFile = async (containerClient, file, index, type, custom_name) => {
    // 生成新文件名
    const newFileName = generateFileName(index, file.originalname, type, custom_name);
    // 获取 BlockBlobClient
    const blockBlobClient = containerClient.getBlockBlobClient(newFileName);

    // 上传文件
    await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    console.log(`${newFileName} 上传成功`);

    return newFileName;
};

// 生成新文件名的函数
const generateFileName = (index, originalName, type, custom_name) => {
    const now = new Date();
    const year = now.getFullYear() % 100; // 年份的最后两位
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const fileExtension = originalName.split('.').pop();
    return `${year}${month}${day}_${type}_${custom_name}_${index + 1}.${fileExtension}`;
};

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在 http://localhost:${port} 上运行`);
});