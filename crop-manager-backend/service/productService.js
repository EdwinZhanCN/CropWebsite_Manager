const axios = require('axios');

const getProducts = async (req, res) => {
    try {
        const url = 'http://localhost:8080/api/static/products';
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error('获取产品信息时出错:', error);
        res.status(500).send('获取产品信息失败');
    }
};

module.exports = { getProducts };