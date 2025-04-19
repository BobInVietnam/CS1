const Queue = require('bull');
const lib = require('../utils/utils');
const redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
};

const createQueue = new Queue('createQueue', { redis: redisConfig });

const shortQueue = new Queue('shortQueue', { redis: redisConfig });

shortQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

shortQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
});

createQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

createQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
});

shortQueue.process(async (job) => {
    const url = await lib.findOrigin(job.data.id);
    return url;
});

createQueue.process(async (job) => {
    const id = await lib.shortUrl(job.data.url);
    return id;
});

module.exports = { createQueue, shortQueue };