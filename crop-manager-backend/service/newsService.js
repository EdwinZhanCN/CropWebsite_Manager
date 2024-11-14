const axios = require('axios');
const redis = require('redis');

// Configure Redis client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

// Function to fetch data from the backend and store it in Redis
async function updateCache() {
    try {
        console.log('getting from 8080...');
        const response = await axios.get('http://localhost:8080/api/static/news');
        if (response.status === 200) {
            await redisClient.set('news', JSON.stringify(response.data));
            console.log('News Cache updated');
        } else {
            console.error('Failed to fetch news:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Set up a timer to update the cache every 10 minutes
setInterval(updateCache, 10 * 60 * 1000);

// Initial cache update
updateCache().then(r => console.log('News Initial cache update'));

const getNews = async (req, res) => {
    try {
        console.log('Getting news from cache...');
        // 用 await 直接获取 Redis 中的 'products' 数据
        const data = await redisClient.get('news');
        if (data) {
            console.log('News fetched from cache');
            res.status(200).send(JSON.parse(data));
        } else {
            console.log('News not found in cache');
            // 缓存中没有时，从后端获取数据
            await updateCache();
        }
    } catch (error) {
        console.error('Error fetching News:', error);
        res.status(500).send('Internal server error');
    }
};


module.exports = { getNews };