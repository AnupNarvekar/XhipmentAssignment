// config/redis.js
const { createClient } = require('redis');
const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect().then(() => console.log('Connected to Redis'));

module.exports = redisClient;
