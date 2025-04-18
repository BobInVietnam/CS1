const Queue = require('bull');
const redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
};

// Hàng đợi cho truy vấn /create
const createQueue = new Queue('createQueue', { redis: redisConfig });

// Hàng đợi cho truy vấn /short/:id
const shortQueue = new Queue('shortQueue', { redis: redisConfig });

module.exports = { createQueue, shortQueue };