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
        const response = await axios.get('http://localhost:8080/api/static/products');
        if (response.status === 200) {
            await redisClient.set('products', JSON.stringify(response.data));
            console.log('Cache updated');
        } else {
            console.error('Failed to fetch products:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Set up a timer to update the cache every 10 minutes
setInterval(updateCache, 10 * 60 * 1000);

// Initial cache update
updateCache().then(r => console.log('Initial cache update'));

const getProducts = async (req, res) => {
    //try to get data from Redis
    await redisClient.get('products', async (error, data) => {
        if (error) {
            console.error('Error getting products from cache:', error);
            res.status(500).send('Internal server error');
        }
        if (data) {
            console.log('Products fetched from cache');
            res.status(200).send(JSON.parse(data));
        } else {
            console.log('Products not found in cache');
            // Fetch data from the backend if not found in cache
            try {
                const response = await axios.get('http://localhost:8080/api/static/products');
                if (response.status === 200) {
                    res.status(200).send(response.data);
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                    res.status(500).send('Internal server error');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                res.status(500).send('Internal server error');
            }
        }
    });
}

module.exports = { getProducts };