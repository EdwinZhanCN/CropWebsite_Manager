// basic requirements
const express = require('express');
const cors = require('cors');

// services
const { upload, uploadFiles } = require('./service/blobUploadService');
const { getProducts } = require('./service/productService');
const { reportIssue } = require('./service/reportIssueService');

// config dotenv
require('dotenv').config();


// create express app
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// define routes
app.post('/api/blob-upload', upload.array('files'), uploadFiles);
app.get('/api/get-products', getProducts);
app.post('/api/report-issue', reportIssue);


// start the server
app.listen(port, () => {
    console.log(`服务器正在 http://localhost:${port} 上运行`);
});